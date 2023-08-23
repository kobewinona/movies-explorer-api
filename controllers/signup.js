const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { OK } = require('../utils/statusCodes');
const ConflictError = require('../errors/conflict-err');

const SALT_ROUNDS = 10;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => {
      User.create({ ...req.body, password: hash })
        .then((user) => {
          // eslint-disable-next-line no-param-reassign
          user.password = undefined;
          res.status(OK).send(user);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким Email уже существует'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports = createUser;
