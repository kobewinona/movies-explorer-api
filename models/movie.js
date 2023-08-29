const mongoose = require('mongoose');

const { MSSG_REQUIRED, MSSG_URL } = require('../utils/constants');
const { urlRegex } = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MSSG_REQUIRED],
  },
  director: {
    type: String,
    required: [true, MSSG_REQUIRED],
  },
  duration: {
    type: Number,
    required: [true, MSSG_REQUIRED],
  },
  year: {
    type: String,
    required: [true, MSSG_REQUIRED],
  },
  description: {
    type: String,
    required: [true, MSSG_REQUIRED],
  },
  image: {
    type: String,
    required: [true, MSSG_REQUIRED],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return urlRegex.test(value);
      },
      message: MSSG_URL,
    },
  },
  trailerLink: {
    type: String,
    required: [true, MSSG_REQUIRED],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return urlRegex.test(value);
      },
      message: MSSG_URL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MSSG_REQUIRED],
    validate: {
      validator(value) {
        // noinspection JSUnresolvedFunction
        return urlRegex.test(value);
      },
      message: MSSG_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, MSSG_REQUIRED],
  },
  nameRU: {
    type: String,
    required: [true, MSSG_REQUIRED],
  },
  nameEN: {
    type: String,
    required: [true, MSSG_REQUIRED],
  },
});

module.exports = mongoose.model('movie', movieSchema);
