const { CONFLICT } = require('../utils/constants');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT;
  }
};
