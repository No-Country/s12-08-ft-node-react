const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    error: true,
    message: error.message || "Something went wrong",
    code: error.statusCode || 500,
    errorName: error.name || "Error",
  });
};

function errorLogger(error, req, res, next) {
  // for logging errors
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
}

module.exports = { errorHandler, errorLogger };
