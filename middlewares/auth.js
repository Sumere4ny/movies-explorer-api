const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/401-unauthorized-error');

const JWT_SECRET_KEY = 'extremly_secret_key';

exports.Auth = (req, res, next) => {
  const token = req.cookies.userToken;

  if (!token) {
    throw new UnauthorizedError('Необходимо залогиниться');
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_KEY,
    );
  } catch (err) {
    throw new UnauthorizedError('Необходимо залогиниться');
  }

  req.user = payload;

  return next();
};
