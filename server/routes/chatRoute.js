const express = require('express');
const authController = require('./../controllers/authController')
const chatController = require('./../controllers/chatController')
const router = express.Router();

router.use(authController.auth);


router.route('/create-chat/:userId').post(chatController.createChat)
router.route('/get-chat/:userId').get(chatController.getAChat)
router.route('/add-chat').put(chatController.addToChat)
router.route('/my-chat').get(chatController.getAllChats)
router.route('/test').get(chatController.test)

module.exports = router;