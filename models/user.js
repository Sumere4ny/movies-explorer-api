const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function f(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError({ message: 'Неправильные почта или пароль' });
      }

      return bcrypt.compare(password, user.password)
        .then((isMatched) => {
          if (!isMatched) {
            throw new UnauthorizedError({ message: 'Неправильные почта или пароль' });
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
