const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const NotUniqueEmail = require('../errors/NotUniqueEmail');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  CONFLICT, NOT_FOUND, BAD_REQUEST, SUCCESS, SUCCESS_LOGOUT,
} = require('../utils/constants');

const handleError = (err) => {
  if (err.name === 'MongoError') {
    throw new NotUniqueEmail({ message: 'Этот email уже используется' });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    throw new BadRequestError(err);
  }
};

const handleIdNotFound = () => {
  throw new NotFoundError({ message: NOT_FOUND });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => handleIdNotFound())
    .then((user) => res.send(user))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError({ message: CONFLICT });
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        name, email, _id: user._id,
      },
    }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => handleIdNotFound())
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ _id: user._id, message: SUCCESS });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  let token = req.cookies.jwt;
  try {
    token = null;
    res
      .cookie('jwt', token)
      .send({ message: SUCCESS_LOGOUT });
  } catch (err) {
    throw new BadRequestError({ message: BAD_REQUEST });
  }
  next();
};
