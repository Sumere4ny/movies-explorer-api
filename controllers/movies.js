const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, MOVIE_NOT_FOUND,
} = require('../constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate('user')
    .then((movies) => res.status(200).send({ movies }))
    .catch((err) => {
      throw new InternalServerError({ message: `${INTERNAL_SERVER_ERROR} ${err.message}` });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .catch((err) => {
      throw new BadRequestError({ message: `${BAD_REQUEST} ${err.message}` });
    })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { _id } = req.params;
  Movie.findById(_id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: MOVIE_NOT_FOUND });
    })
    .then((movie) => {
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError({ message: FORBIDDEN });
      }
      Movie.findByIdAndDelete(_id)
        .then((deletedMovie) => {
          res.send({ data: deletedMovie });
        })
        .catch(next);
    })
    .catch(next);
};
