const { NOT_FOUND } = require('../utils/constants');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
  }
};
