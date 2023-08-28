// noinspection JSCheckFunctionSignatures

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const signup = require('../controllers/signup');
const signin = require('../controllers/signin');
const signout = require('../controllers/signout');
const auth = require('../middlewares/auth');
const { urlRegex } = require('../utils/regex');
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

// sign routes

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}, { abortEarly: false }), signup);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, { abortEarly: false }), signin);

router.post('/signout', celebrate({
  cookies: Joi.object().keys({
    token: Joi.string().required(),
  }),
}, { abortEarly: false }), signout);

// auth middleware

router.use(auth);

// user routes

router.get('/users/me', getCurrentUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}, { abortEarly: false }), updateCurrentUser);

// movie routes

router.get('/movies', getMovies);

router.post('/movies', celebrate({
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
}, { abortEarly: false }), addMovie);

// router.delete('/movies/:id', celebrate({
//   params: Joi.object().keys({
//     id: Joi.string().pattern(idRegex).required(),
//   }),
// }), deleteMovie);

router.delete('/movies/:id', deleteMovie);

module.exports = router;
