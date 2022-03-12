const AppError = require('../utility/appError');

module.exports = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  /// DEVELOPMENT ENVIRONMENT
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      errorInformation: {
        error,
      },
    });
  } else if (process.env.NODE_ENV === 'production') {
    if (error.isOperational) {
      if (error.name === 'CastError') {
        return new AppError(`Invalid ${error.path}: ${error.value}}`, 400);
      }

      if (error.code === 11000) {
        const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];

        return new AppError(
          `Duplicate field value: ${value}. Please use another value!`,
          400
        );
      }

      if (error.name === 'ValidatorError') {
        const errors = Object.values(error.errors).map((el) => el.message);
        const message = `Invalid input data. ${errors.join('. ')}`;
        return new AppError(message, 400);
      }

      if (error.name === 'JsonWebTokenError') {
        return new AppError('Invalid token. Please log in again!', 401);
      }

      if (error.name === 'TokenExpiredError') {
        new AppError('Your token has expired! Please log in again.', 401);
      }

      response.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      return response.status(500).json({
        status: 'error',
        message: 'Something went very wrong!, Please try again later...',
      });
    }
  }
};
