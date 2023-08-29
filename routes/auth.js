// noinspection JSCheckFunctionSignatures

const router = require('express').Router();

const { signUp, signIn, signOut } = require('../controllers/auth');
const {
  validateSignUp,
  validateSignIn,
  validateSignOut,
} = require('../utils/validators/authValidator');

router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);
router.post('/signout', validateSignOut, signOut);

module.exports = router;
