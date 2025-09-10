const { NOT_AUTHORIZED_STATUS_CODE } = require("../utils/errors");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTHORIZED_STATUS_CODE;
  }
}

module.exports = ForbiddenError;
