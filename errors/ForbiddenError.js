const { FORBIDDEN_STATUS_CODE } = require("../utils/errors");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_STATUS_CODE;
  }
}

module.exports = ForbiddenError;
