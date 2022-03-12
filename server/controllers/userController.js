const User = require('../models/userModel');
const sharp = require('sharp');
const catchAsync = require('../utility/catchAsync');
const multer = require('multer');

const filterObject = (object, ...allowedFields) => {
  const newObject = {};
  Object.keys(object).forEach((element) => {
    if (allowedFields.includes(element)) newObject[element] = object[element];
  });
  return newObject;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (request, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('profilePhoto');

exports.resizeUserPhoto = catchAsync(async (request, response, next) => {
  if (!request.file) return next();

  request.file.filename = `user-${request.user.id}-${Date.now()}.jpeg`;

  await sharp(request.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${request.file.filename}`);

  next();
});

exports.getAllUsers = (request, response) => {
  const users = User.find();

  response.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.updateMe = catchAsync(async (request, response, next) => {
  const filteredBody = filterObject(
    request.body,
    'name',
    'email',
    'address',
    'phoneNumber'
  );

  if (request.file) filteredBody.profilePhoto = request.file.filename;
  const updatedUser = await User.findByIdAndUpdate(
    request.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  response.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.updateCart = catchAsync(async (request, response, next) => {
  const filteredBody = filterObject(request.body, 'cartData');
  await User.findByIdAndUpdate(request.user.id, filteredBody, {
    new: true,
    runValidators: false,
  });

  response.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.deleteMe = catchAsync(async (request, response, next) => {
  const user = await User.findById(request.user.id).select('+password');
  if (
    !(await user.comparePassword(request.body.passwordCurrent, user.password))
  ) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  await User.findByIdAndUpdate(request.user.id, {
    accountActiveStatus: false,
  });

  response.status(204).json({ status: 'success', data: null });
});
