const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please login again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Token expired. Please login again!", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or unknown error
  } else {
    // log error for dev debugging
    console.log("Error", err);

    // send generic message
    res.status(500).json({
      status: "error",
      message: "something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    let caughtErr = { ...err };
    if (err.name === "JsonWebTokenError") caughtErr = handleJWTError();
    if (err.name === "TokenExpiredError") caughtErr = handleJWTExpiredError();
    if (err.name === "CastError") caughtErr = handleCastErrorDB(caughtErr);
    if (err.code === 11000) caughtErr = handleDuplicateFieldDB(caughtErr);
    if (err.name === "ValidationError")
      caughtErr = handleValidationErrorDB(caughtErr);
    // sendErrorProd(caughtErr, res);
    sendErrorDev(err, res);
  }
};
