const {Router} = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');
const exampleRouter = require('./examples')
const exampleRouter = require('./examples');
const chatsRouter = require('./chats');

const router = Router();

router.use('/users', usersRouter);

router.use('/auth', authRouter);

router.use('/examples', exampleRouter);

router.use('/', chatsRouter);


module.exports = router