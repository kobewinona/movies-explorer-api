// noinspection JSCheckFunctionSignatures

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const handleCors = require('./middlewares/corsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');
const NotFoundError = require('./errors/not-found-err');
const handleError = require('./middlewares/errorHandler');

const {
  MONGO_DB_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = express();

app.set('trust proxy', 1);

app.use(handleCors);

// noinspection JSUnresolvedFunction
mongoose.connect(MONGO_DB_URL);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use('/', indexRouter);

app.use(errorLogger);
app.use(errors());

app.all('*', (req, res, next) => {
  next(new NotFoundError('Что-то пошло не так...'));
});

app.use(handleError);

module.exports = app;
