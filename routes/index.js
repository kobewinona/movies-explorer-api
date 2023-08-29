// noinspection JSCheckFunctionSignatures

const router = require('express').Router();

const auth = require('../middlewares/auth');

const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use(authRouter);
router.use(auth);
router.use('/users/', usersRouter);
router.use('/movies/', moviesRouter);

module.exports = router;
