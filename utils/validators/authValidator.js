const { celebrate, Joi } = require('celebrate');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}, { abortEarly: false });

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, { abortEarly: false });

const validateSignOut = celebrate({
  cookies: Joi.object().keys({
    token: Joi.string().required(),
  }),
}, { abortEarly: false });

module.exports = {
  validateSignUp,
  validateSignIn,
  validateSignOut,
};
