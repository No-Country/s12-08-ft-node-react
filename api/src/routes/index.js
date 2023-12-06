const {Router} = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');
const exampleRouter = require('./examples')
const chatsRouter = require('./chats');
const messagesRouter = require('./messages');
const commentsRouter = require('./comments');

const router = Router();

router.get("/", async (req, res) => {
    res.redirect(301, '/api/docs')
});

router.use('/users', usersRouter);

router.use('/auth', authRouter);

router.use('/examples', exampleRouter);

router.use('/chats', chatsRouter);

router.use('/message', messagesRouter);

router.use('/comment', commentsRouter);


module.exports = router