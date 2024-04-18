const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../multer')



router.post('/create', upload.single("image"),authMiddleware, postController.createPost);
router.post('/getuserpost', authMiddleware,postController.getPostByUserId);
router.get('/getall', postController.getAllPosts);
router.get('/:id/singlepost', authMiddleware,postController.getSinglePostById);
router.put('/updatepost',authMiddleware, postController.updatePost)
router.delete('/:postId/delete', authMiddleware, postController.deletePost)

router.get("/follower", authMiddleware, postController.getPostsByFollowedUser)
module.exports = router;
