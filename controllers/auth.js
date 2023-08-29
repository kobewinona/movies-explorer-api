// noinspection JSUnresolvedFunction

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {
  OK, MSSG_CONFLICT_EMAIL, MSSG_SUCCESS_SIGNOUT,
} = require('../utils/constants');
const ConflictError = require('../errors/conflict-err');
const { SECRET } = require('../utils/appConfig');

const SALT_ROUNDS = 10;

const signUp = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => {
      User.create({ ...req.body, password: hash })
        .then((user) => {
          const { password, ...userWithoutPassword } = user.toObject();
          res.status(OK).send(userWithoutPassword);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError(MSSG_CONFLICT_EMAIL));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const signIn = (req, res, next) => {
  // noinspection JSUnresolvedFunction
  User.findUserByCredentials(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET,
        { expiresIn: '7d' },
      );

      const oneDayMilliseconds = 24 * 60 * 60 * 1000;
      const maxAge = 7 * oneDayMilliseconds;

      res.cookie('token', token, { maxAge, httpOnly: true, sameSite: true });

      const { password, ...userWithoutPassword } = user.toObject();

      res.status(OK).send(userWithoutPassword);
    })
    .catch(next);
};

const signOut = (req, res) => {
  res.cookie('token', '', { expires: new Date(0), httpOnly: true, sameSite: true });
  res.status(OK).send({ message: MSSG_SUCCESS_SIGNOUT });
};

module.exports = { signUp, signIn, signOut };
