class ApiErrorException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || 'Something went wrong at or side';
    Object.setPrototypeOf(this, ApiErrorException.prototype);
  }

  serializeErrors() {
    return {
      status: 'error', statusCode: this.statusCode, message: this.message,
    };
  }
}

module.exports = ApiErrorException;