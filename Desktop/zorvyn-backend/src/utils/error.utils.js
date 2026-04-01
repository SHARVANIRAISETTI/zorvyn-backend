class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (err, req, res, next) => {
  const status = err.statusCode || 500;
  return res.status(status).json({ error: err.message || 'Internal Server Error' });
};

module.exports = { AppError, handleError };
