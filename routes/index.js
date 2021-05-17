const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const { login, createUser, logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.get('/signout', auth, logout);

router.use(auth, usersRouter);
router.use(auth, moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError({ message: 'Запрашиваемый ресурс не найден' }));
});
module.exports = router;
