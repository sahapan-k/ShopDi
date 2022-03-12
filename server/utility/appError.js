class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
    this.isOperational = true;

    // error on error.stack will not appear(originate) on this file so will not pollute system log
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
