const ApiErrorException = require("@src/exceptions/api-error.exception");
const Joi = require("joi");

const responseSuccess = async (res, data) => {
  return res.json({ status: 'success', statusCode: 200, data });
}

const responseError = async (res, error, defaultPayload = '') => {
  let message = 'Unexpected Error';
  let statusCode = 400;
  let payload;

  if (defaultPayload && typeof defaultPayload === 'string') {
    payload = defaultPayload;
  }

  if (error) {

    console.log(error);
    if (error instanceof ApiErrorException) {
      ({ message, statusCode } = error);
    }

    if (typeof error === 'object') {
      if (error instanceof Joi.ValidationError) {
        message = error.details[0].message;
      } else if (error[0]) {
        message = error;
      } else if (error.PAYLOAD) {
        payload = error.PAYLOAD;
      }
    }
  }

  return res.status(statusCode).send({
    status: 'error',
    statusCode,
    message,
    payload,
  });
}

module.exports = {
  responseSuccess,
  responseError,
}