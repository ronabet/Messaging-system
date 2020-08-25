const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapController');
const userController = require('../controllers/userController');


router.get('/', wrapAsync(userController.getAllUsers));
router.get('/:id', wrapAsync(userController.getUserById));
router.post('/', wrapAsync(userController.createUser));

module.exports = router

