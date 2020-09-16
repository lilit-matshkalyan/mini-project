/* eslint-disable max-classes-per-file */
const { BASE_ERRORS } = require('./constants');

class BaseError extends Error {}

class InternalServerError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.INTERNAL_SERVER_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    } else error = { ...error, details: BASE_ERRORS.INTERNAL_SERVER_ERROR.debug };

    return error;
  }
}


class InvalidUserCredentials extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.INVALID_USER_CREDENTIALS;

    if (this.details) {
      error = { ...error, details: this.details };
    } else error = { ...error, details: BASE_ERRORS.INVALID_USER_CREDENTIALS.debug };
    return error;
  }
}

class AccessDeniedError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.ACCESS_DENIED_ERROR;

    if (this.details) {
      return { ...error, details: this.details };
    } error = { ...error, details: BASE_ERRORS.ACCESS_DENIED_ERROR.debug };
    return error;
  }
}

class AuthenticationError extends BaseError {
  constructor(details) {
    super();
    // this.details = details;
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.AUTHENTICATION_ERROR;
    if (this.details) {
      if (this.details.name) {
        delete this.details.name;
      }
      error = { ...error, details: this.details };
    } else {
      error = { ...error, details: BASE_ERRORS.AUTHENTICATION_ERROR.debug };
    }

    return error;
  }
}

class InvalidUserInput extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.INVALID_USER_INPUT;
    if (this.details) {
      if (this.details.name) {
        delete this.details.name;
      }
      error = { ...error, details: this.details };
    } else {
      error = { ...error, details: BASE_ERRORS.INVALID_USER_INPUT.debug };
    }

    return error;
  }
}

class RequiredParameterNotProvided extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.REQUIRED_PARAMETER_NOT_PROVIDED;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class SequelizeError extends BaseError {
  constructor(exception) {
    super();
    this.exception = exception;
    this.details = exception.errors ? exception.errors[0].message : exception.message;
  }

  getError() {
    let error = BASE_ERRORS.INVALID_USER_INPUT;
    if (this.details) {
      error = { ...error, details: this.details };
      if (!this.exception.errors) { [error.details, error.debug] = [error.debug, error.details]; }
      error.details = {
        message: error.details
      };
    }
    return error;
  }
}

class SomethingWentWrong extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.SOMETHING_WENT_WRONG;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class ResourceNotFoundError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.RESOURCE_NOT_FOUND_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    } else error = { ...error, details: { message: BASE_ERRORS.RESOURCE_NOT_FOUND_ERROR.debug } };
    return error;
  }
}

class ServiceNotAvailableError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.SERVICE_NOT_AVAILABLE;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class ResourceDuplicationError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.RESOURCE_DUPLICATION_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

class UnavailableForLegalReasons extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.UNAVAILABLE_FOR_LEGAL_REASONS;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}


class BadRequest extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.BAD_REQUEST;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}
class ExpiredResourceError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.EXPIRED_RESOURCE;
    if (this.details) {
      error = { ...error, details: this.details };
    }
    return error;
  }
}

module.exports = {
  BaseError,
  BadRequest,
  InvalidUserInput,
  InternalServerError,
  ExpiredResourceError,
  InvalidUserCredentials,
  RequiredParameterNotProvided,
  UnavailableForLegalReasons,
  ResourceDuplicationError,
  ResourceNotFoundError,
  AuthenticationError,
  AccessDeniedError,
  SequelizeError,
  ServiceNotAvailableError,
  SomethingWentWrong
};
