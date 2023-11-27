const {Router} = require('express');
const usersRouter = require('./users');

const router = Router();

router.use('/auth', usersRouter);

module.exports = router