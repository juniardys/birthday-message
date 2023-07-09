const { ApiErrorException } = require("@src/exceptions/api-error.exception");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiErrorException) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }
  return res.status(500).send({
    status: 'error',
    statusCode: 500,
    message: 'Something went wrong at our side',
  });
};

module.exports = {
  errorHandler
};