const { UNAUTHORIZED } = require('../utils/constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED;
  }
};
