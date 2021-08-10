const express = require('express');
const { validateCreateMovie, validateRemoveMovie } = require('../middlewares/validation');
const { createMovie, removeMovie, getAllMovies } = require('../controllers/movies');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getAllMovies);

moviesRoutes.post('/', validateCreateMovie, createMovie);
moviesRoutes.delete('/:movieId', validateRemoveMovie, removeMovie);

exports.moviesRoutes = moviesRoutes;
