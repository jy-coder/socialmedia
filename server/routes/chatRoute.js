const express = require('express');
const authController = require('./../controllers/authController')
const chatController = require('./../controllers/chatController')
const router = express.Router();

router.use(authController.auth);


router.route('/create-chat').post(chatController.createChat)
router.route('/add-chat').put(chatController.addToChat)
router.route('/my-chat').get(chatController.getAllChats)

module.exports = router;