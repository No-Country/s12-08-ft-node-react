const {Router} = require('express');
const usersRouter = require('./users');
const exampleRouter = require('./examples');
const chatsRouter = require('./chats');

const router = Router();

router.use('/auth', usersRouter);

router.use('/examples', exampleRouter);

router.use('/', chatsRouter);


module.exports = router