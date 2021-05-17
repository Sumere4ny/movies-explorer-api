const moviesRouter = require('express').Router();
const {
  validateMovie,
  validateId,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', validateMovie, createMovie);
moviesRouter.delete('/movies/:_id', validateId, deleteMovie);

module.exports = moviesRouter;
