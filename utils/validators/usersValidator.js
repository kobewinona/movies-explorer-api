const { celebrate, Joi } = require('celebrate');

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}, { abortEarly: false });

module.exports = { validateUserUpdate };
