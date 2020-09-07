const express = require('express');
const postController = require('./../controllers/postController')
const authController = require('./../controllers/authController')

const router = express.Router();


router.route('/').get(postController.accessToAll)
router.route('/user-post/:id').get(postController.otherUserPost)

router.use(authController.auth);


router.route('/mypost').get(postController.myPost)

router.route('/create-post').post
(postController.createPost)

router.route('/delete-post/:id').delete(postController.deletePost)
router.route('/like').put(postController.likePost)
router.route('/unlike').put(postController.unlikePost)
router.route('/comment').put(postController.commentPost)
router.route('/uncomment').put(postController.uncommentPost)

router.route('/update-post/:id').put(postController.updatePost)
router.route('/feed').get(postController.getFeed)
router.route('/:id')
.get(postController.getAPost)


module.exports = router;