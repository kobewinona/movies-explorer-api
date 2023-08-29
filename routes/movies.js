// noinspection JSCheckFunctionSignatures

const router = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const {
  validateMovieAdd,
  validateMovieDelete,
} = require('../utils/validators/moviesValidator');

router.get('/', getMovies);
router.post('/', validateMovieAdd, addMovie);
router.delete('/:id', validateMovieDelete, deleteMovie);

module.exports = router;
