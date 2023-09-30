const Movie = require('../models/movie');
const {
  OK, MSSG_NOT_FOUND_MOVIE, MSSG_UNAUTHORIZED, MSSG_BAD_REQUEST,
} = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

module.exports.saveMovie = (req, res, next) => {
  const movieInfo = req.body;
  const owner = req.user._id;

  Movie.create({ ...movieInfo, owner })
    .then((data) => res.status(OK).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MSSG_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(MSSG_NOT_FOUND_MOVIE))
    .then((movie) => {
      // noinspection JSUnresolvedVariable
      if (movie && movie.owner.equals(req.user._id)) {
        Movie.deleteOne(movie)
          .then(() => res.status(OK).send(movie))
          .catch(next);
      } else {
        throw new ForbiddenError(MSSG_UNAUTHORIZED);
      }
    })
    .catch(next);
};
