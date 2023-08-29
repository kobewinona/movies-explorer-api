// noinspection JSCheckFunctionSignatures

const router = require('express').Router();

const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { validateUserUpdate } = require('../utils/validators/usersValidator');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserUpdate, updateCurrentUser);

module.exports = router;
