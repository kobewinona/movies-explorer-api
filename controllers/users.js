const User = require('../models/user');
const { OK } = require('../utils/statusCodes');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(OK).send(user))
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true },
  )
    .then((user) => res.status(OK).send(user))
    .catch(next);
};

module.exports = { getCurrentUser, updateCurrentUser };
