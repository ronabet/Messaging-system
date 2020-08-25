const userRouter = require('./routers/userRouter');
const messageRouter = require('./routers/messageRouter');
const express = require('express');
const { route } = require('./routers/messageRouter');
const router = express.Router();

router.get('/', (req, res) => { res.send("Welcome for messaging service server!")})
router.use('/api/users', userRouter);
router.use('/api/messages', messageRouter);

module.exports = router;