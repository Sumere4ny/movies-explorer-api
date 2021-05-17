const usersRouter = require('express').Router();
const {
  updateUserProfileValidation,
} = require('../middlewares/validation');
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUserProfileValidation, updateUser);

module.exports = usersRouter;
