const jwt = require('jsonwebtoken');

const { SECRET } = require('../utils/appConfig');
const UnauthorizedError = require('../errors/unauthorized-err');
const { MSSG_UNAUTHORIZED_AUTH } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  console.log('SECRET', SECRET);

  if (!token) {
    next(new UnauthorizedError(MSSG_UNAUTHORIZED_AUTH));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      SECRET,
    );
  } catch (err) {
    next(new UnauthorizedError(MSSG_UNAUTHORIZED_AUTH));
    return;
  }

  req.user = payload;

  next();
};
