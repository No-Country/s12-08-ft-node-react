const {Router} = require('express');
const usersRouter = require('./users');
const exampleRouter = require('./examples')

const router = Router();

router.use('/auth', usersRouter);

router.use('/examples', exampleRouter);

module.exports = router