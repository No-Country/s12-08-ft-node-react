const {Router} = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');
const exampleRouter = require('./examples')
const chatsRouter = require('./chats');
const messagesRouter = require('./messages');

const router = Router();

router.use('/users', usersRouter);

router.use('/auth', authRouter);

router.use('/examples', exampleRouter);

router.use('/chats', chatsRouter);

router.use('/message', messagesRouter);



module.exports = router