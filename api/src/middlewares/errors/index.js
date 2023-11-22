const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    error: true,
    message: error.message || "Something went wrong",
    code: error.statusCode || 500,
    errorName: error.name || "Error",
  });
};

module.exports = { errorHandler };
