const userRouter = require('./routers/userRouter');
const messageRouter = require('./routers/messageRouter');
const express = require('express');
const router = express.Router();

router.use('/api/users', userRouter);
router.use('/api/messages', messageRouter);

module.exports = router;