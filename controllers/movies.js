const mongoose = require('mongoose');

const Movie = require('../models/movie');
const { OK } = require('../utils/statusCodes');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const movieInfo = req.body;
  const owner = req.user._id;

  Movie.create({ ...movieInfo, owner })
    .then((data) => res.status(OK).send(data))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  // noinspection JSUnresolvedVariable
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Movie.findById(req.params.id)
      .then((movie) => {
        if (!movie) {
          throw new NotFoundError('Запрашиваемый фильм не найден');
        }

        // noinspection JSUnresolvedVariable
        if (movie && movie.owner.equals(req.user._id)) {
          Movie.deleteOne(movie)
            .then(() => res.status(OK).send(movie))
            .catch(next);
        } else {
          throw new ForbiddenError('У Вас нет прав для совершения данного действия');
        }
      })
      .catch(next);
  } else {
    next(new BadRequestError('Данные введены некорректно'));
  }
};

module.exports = { getMovies, addMovie, deleteMovie };
