const User = require('../models/user');
const {
  OK, MSSG_CONFLICT_EMAIL, MSSG_NOT_FOUND_USER, MSSG_BAD_REQUEST,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(MSSG_NOT_FOUND_USER))
    .then((user) => res.status(OK).send(user))
    .catch(next);
};

module.exports.updateCurrentUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(MSSG_NOT_FOUND_USER))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(MSSG_BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ConflictError(MSSG_CONFLICT_EMAIL));
      } else {
        next(err);
      }
    });
};
