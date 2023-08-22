const mongoose = require('mongoose');

const urlRegex = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return urlRegex.test(value);
      },
      message: 'Поле должно содержать URL адрес',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return urlRegex.test(value);
      },
      message: 'Поле должно содержать URL адрес',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return urlRegex.test(value);
      },
      message: 'Поле должно содержать URL адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Поле должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
