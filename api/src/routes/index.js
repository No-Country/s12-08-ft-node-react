const {Router} = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');
const exampleRouter = require('./examples');
const chatsRouter = require('./chats');
const messagesRouter = require('./messages');
const commentsRouter = require('./comments');
const paymentsRouter = require('./payments');
const subscriptionsRouter = require('./subscriptions');


const router = Router();

router.use('/users', usersRouter);

router.use('/auth', authRouter);

router.use('/examples', exampleRouter);

router.use('/chats', chatsRouter);

router.use('/message', messagesRouter);

router.use('/comments', commentsRouter);

router.use('/payments', paymentsRouter);

router.use('/subscriptions', subscriptionsRouter);


module.exports = router