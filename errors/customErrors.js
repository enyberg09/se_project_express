const {
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  NOT_AUTHORIZED_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  DUPLICATE_CONFLICT_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require("../utils/errors");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS_CODE;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS_CODE;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTHORIZED_STATUS_CODE;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS_CODE;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_CONFLICT_STATUS_CODE;
  }
}

class InternalError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVER_ERROR_STATUS_CODE;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalError,
};
