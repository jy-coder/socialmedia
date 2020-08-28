const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();


router.post('/signup', authController.signup);
router.route('/login').post(authController.login);
router.get('/logout', authController.logout);
router.route('/otheruser/:id').get(userController.otherUser);

router.use(authController.auth);

router.route('/unfollow').put(userController.unfollowUser,userController.removeFollowing);
router.route('/follow').put(userController.followUser , userController.addFollowing);
router.route('/getUser').get(authController.getUser)
router.route('/updateMe').patch(authController.updateMe)
router.route('/getAllUsers').get(userController.getAllUsers)



module.exports = router;