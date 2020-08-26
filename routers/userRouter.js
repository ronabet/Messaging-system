const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapController');
const userController = require('../controllers/userController');


router.get('/', wrapAsync(userController.getAllUsers));
router.post('/', wrapAsync(userController.createUser));
router.get('/:id', wrapAsync(userController.getUserById));

module.exports = router;

