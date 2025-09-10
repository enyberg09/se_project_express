const { UNAUTHORIZED_STATUS_CODE } = require("../utils/errors");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS_CODE;
  }
}

module.exports = UnauthorizedError;
