/* eslint-disable no-param-reassign */
const { SEQUELIZE_ERRORS, JWT_ERRORS } = require('../exceptions/constants');
const {
  SequelizeError, BaseError, InternalServerError, AuthenticationError
} = require('../exceptions');

function normalizeError(exception) {
  if (SEQUELIZE_ERRORS[exception.name]) {
    return new SequelizeError(exception);
  }
  if (JWT_ERRORS[exception.name]) {
    return new AuthenticationError(exception);
  }

  return exception;
}

module.exports = (ctx, exception) => {
  exception = normalizeError(exception);
  if (exception instanceof BaseError) {
    console.error(exception);
    if (!Array.isArray(exception.details)) exception.details = [exception.details];

    return exception;
  }

  console.error(exception);
  return new InternalServerError();
};
