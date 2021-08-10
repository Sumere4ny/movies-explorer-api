const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/users');
const { validateUserUpdateProfile } = require('../middlewares/validation');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserProfile);
usersRoutes.patch('/me', validateUserUpdateProfile, updateUserProfile);

exports.usersRoutes = usersRoutes;
