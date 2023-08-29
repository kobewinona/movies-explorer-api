const { celebrate, Joi } = require('celebrate');
const { urlRegex, idRegex } = require('../regex');

const validateMovieAdd = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(urlRegex).required(),
    trailerLink: Joi.string().pattern(urlRegex).required(),
    thumbnail: Joi.string().pattern(urlRegex).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}, { abortEarly: false });

const validateMovieDelete = celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(idRegex).required(),
  }),
});

module.exports = { validateMovieAdd, validateMovieDelete };
