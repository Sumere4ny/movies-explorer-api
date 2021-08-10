require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const { routes } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { rateLimiter } = require('./middlewares/rateLimiter');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(cors({
  origin: ['http://sumere4ny-movies.nomoredomains.rocks', 'https://sumere4ny-movies.nomoredomains.rocks', 'http://localhost:3001'],
  credentials: true,
}));

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use(rateLimiter);

app.use(cookieParser());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listenting on port ${PORT}`);
});
