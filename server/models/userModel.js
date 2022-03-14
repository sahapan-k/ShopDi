const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: [true, 'This email address have already been taken'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email!'],
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
  profilePhoto: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'An password is required'],
    minlength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (element) {
        // Validator only works on CREATE and SAVE
        return element === this.password;
      },
      message: 'Please make sure that both password are identical',
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  accountActiveStatus: {
    type: Boolean,
    default: true,
    select: false,
  },
  cartData: {
    type: Array,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
});

UserSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ accountActiveStatus: { $ne: false } });
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
