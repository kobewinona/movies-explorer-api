// noinspection JSCheckFunctionSignatures

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const handleCors = require('./middlewares/corsHandler');
const { DB_HOST } = require('./utils/appConfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const indexRouter = require('./routes/index');
const NotFoundError = require('./errors/not-found-err');
const handleError = require('./middlewares/errorHandler');
const { MSSG_NOT_FOUND_SERVER } = require('./utils/constants');

const app = express();

app.set('trust proxy', 1);

app.use(handleCors);

// noinspection JSUnresolvedFunction
mongoose.connect(DB_HOST);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use('/', indexRouter);
app.all('*', (req, res, next) => {
  next(new NotFoundError(MSSG_NOT_FOUND_SERVER));
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

module.exports = app;
