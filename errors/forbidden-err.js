const { FORBIDDEN } = require('../utils/constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN;
  }
};
