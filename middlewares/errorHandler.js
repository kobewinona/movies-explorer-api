const { MSSG_INTERNAL_SERVER_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const status = err.status || 500;

  const message = status === 500 ? MSSG_INTERNAL_SERVER_ERROR : err.message;

  res.status(status).send({ message });
  next();
};
