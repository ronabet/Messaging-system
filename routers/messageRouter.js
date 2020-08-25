const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const wrapAsync = require('../utils/wrapController');


router.post('/', wrapAsync(messageController.sendMessage));
router.get('/:userId', wrapAsync(messageController.getMessagesByUser));
router.get('/unread/:userId', wrapAsync(messageController.getAllUnreadMessages));


module.exports = router

