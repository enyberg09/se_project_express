const errorHandler = (err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message = "Something went wrong on the server" } =
    err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "An internal server error occurred" : message,
  });
};

module.exports = errorHandler;
