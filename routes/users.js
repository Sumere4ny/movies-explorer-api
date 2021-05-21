const usersRouter = require('express').Router();
const {
  updateUserProfileValidation,
} = require('../middlewares/validation');
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', updateUserProfileValidation, updateUser);

module.exports = usersRouter;
