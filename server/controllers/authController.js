const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utility/appError');
const catchAsync = require('../utility/catchAsync');
const { promisify } = require('util');
const sendEmail = require('../utility/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, request, response) => {
  const token = signToken(user._id);
  response.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    // secure: request.secure || request.headers['x-forwarded-proto'] === 'https',
    sameSite: 'None',
  });

  // Remove password from output
  user.password = undefined;

  response.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (request, response, next) => {
  const newUser = await User.create({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  });
  createSendToken(newUser, 201, response, request);
});

exports.login = catchAsync(async (request, response, next) => {
  const { email, password } = request.body;

  // Check if email has input
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user existed & password is corrected
  const user = await User.findOne({ email }).select('+password');
  const isCorrect = await user.comparePassword(password, user.password);
  if (!user || !isCorrect) {
    return next(
      new AppError(
        'the username and password combination you entered does not correspond to a registered user'
      ),
      401
    );
  }
  createSendToken(user, 201, request, response);
});

exports.logout = (request, response) => {
  response.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  response.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (request, response, next) => {
  let token;
  if (request.cookies.jwt) {
    token = request.cookies.jwt;
  } else if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer')
  ) {
    token = request.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in, Please login first', 401));
  }
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(new AppError('user no longer existed', 401));
  }
  if (user.changedPasswordAfter(decodedToken.iat)) {
    return next(new AppError('Session expired! Please login again...', 401));
  }
  request.user = user;
  next();
});

exports.isLoggedIn = async (request, response, next) => {
  if (request.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        request.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      request.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.rolesRestrict = (...roles) => {
  return (request, response, next) => {
    const hasAccess = roles.includes(request.user.role);
    if (!hasAccess) {
      return next(new AppError('Limited access', 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (request, response, next) => {
  const user = await User.findOne({ email: request.body.email });
  if (!user) {
    return next(
      new AppError('There is no user with provided email address.', 404)
    );
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${request.protocol}://${request.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    await sendEmail({
      email: user.email,
      subject: 'Password reset',
      message: `Forgot your password? send the token attached to this response to the ${resetURL} with your new password and confirm password, Please ignore the email in case that these does not originated from you...`,
    });

    response.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (request, response, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(request.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = request.body.password;
  user.passwordConfirm = request.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, request, response);
});

exports.updatePassword = catchAsync(async (request, response, next) => {
  const user = await User.findById(request.user.id).select('+password');
  if (
    !(await user.comparePassword(request.body.passwordCurrent, user.password))
  ) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = request.body.password;
  user.confirmPassword = request.body.confirmPassword;
  await user.save();

  createSendToken(user, 200, request, response);
});
