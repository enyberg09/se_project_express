const { DUPLICATE_CONFLICT_STATUS_CODE } = require("../utils/errors");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_CONFLICT_STATUS_CODE;
  }
}

module.exports = ConflictError;
