const mongoose = require('mongoose');
const {
  BAD_REQUEST, INTERNAL_SERVER_ERROR, MSSG_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  // noinspection JSUnresolvedVariable
  if (err instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(err.errors).map((error) => {
      const { path, message } = error;
      return `Ошибка в поле ${path}: ${message}.`;
    });

    res.status(BAD_REQUEST).send({ message: errorMessages.join(' ') });
    next();
  }

  if (!err.status) {
    res.status(INTERNAL_SERVER_ERROR).send({
      message: MSSG_INTERNAL_SERVER_ERROR,
    });
    next();
  }

  res.status(err.status).send({ message: err.message });
  next();
};
