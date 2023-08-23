const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { nameRegex } = require('../utils/regex');
const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    unique: [true, 'Данный Email адрес уже используется'],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return validator.isEmail(value);
      },
      message: 'Поле должно содержать Email адрес',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Поле должно содержать более 2 символов'],
    maxlength: [30, 'Поле должно содержать не более 30 символов'],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return nameRegex.test(value);
      },
      message: 'Поле должно содержать имя',
    },
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
