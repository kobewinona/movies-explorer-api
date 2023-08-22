const mongoose = require('mongoose');
const validator = require('validator');

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
        return validator.isAlpha(value);
      },
      message: 'Поле должно содержать имя',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
