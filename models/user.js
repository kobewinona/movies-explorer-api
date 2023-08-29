const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { nameRegex } = require('../utils/regex');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  MSSG_UNAUTHORIZED_CREDENTIALS,
  MSSG_REQUIRED,
  MSSG_UNIQUE_EMAIL,
  MSSG_VALIDATE_EMAIL,
  MSSG_MINLENGTH_2,
  MSSG_MAXLENGTH_30,
  MSSG_VALIDATE_NAME,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, MSSG_REQUIRED],
    unique: [true, MSSG_UNIQUE_EMAIL],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return validator.isEmail(value);
      },
      message: MSSG_VALIDATE_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, MSSG_REQUIRED],
    select: false,
  },
  name: {
    type: String,
    required: [true, MSSG_REQUIRED],
    minlength: [2, MSSG_MINLENGTH_2],
    maxlength: [30, MSSG_MAXLENGTH_30],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return nameRegex.test(value);
      },
      message: MSSG_VALIDATE_NAME,
    },
  },
});

userSchema.statics.findUserByCredentials = function handleSearch({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(MSSG_UNAUTHORIZED_CREDENTIALS));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(MSSG_UNAUTHORIZED_CREDENTIALS));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
