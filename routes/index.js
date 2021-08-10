const express = require('express');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const NotFoundError = require('../errors/404-not-found-error');
const { Auth } = require('../middlewares/auth');
const { onSignOut, createUser, onLogin } = require('../controllers/users');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');

const routes = express.Router();

routes.post('/signup', validateSignUp, createUser);
routes.post('/signin', validateSignIn, onLogin);

routes.use('/users', Auth, usersRoutes);
routes.use('/movies', Auth, moviesRoutes);
routes.use('/signout', Auth, onSignOut);
routes.use('*', Auth, () => {
  throw new NotFoundError('Не туда!!!');
});

exports.routes = routes;
