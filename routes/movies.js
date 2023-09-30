// noinspection JSCheckFunctionSignatures

const router = require('express').Router();

const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const {
  validateMovieAdd,
  validateMovieDelete,
} = require('../utils/validators/moviesValidator');

router.get('/', getMovies);
router.post('/', validateMovieAdd, saveMovie);
router.delete('/:id', validateMovieDelete, deleteMovie);

module.exports = router;
