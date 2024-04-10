const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/follow', authMiddleware, userController.followUser);
router.post('/unfollow', authMiddleware, userController.unfollowUser);

router.post('/:postId/like',authMiddleware,  userController.likePost)

router.post('/:postId/unlike', authMiddleware, userController.unlikePost )

router.get('/:postId/getlike',authMiddleware,  userController.getPostLikes)


router.post('/:id/comment',authMiddleware, userController.commentPost )

router.get("/:postId/allcomment", authMiddleware, userController.getAllCommentsForPost)

router.put("/:postId/updatecomment", authMiddleware, userController.updateComment)

router.delete("/:postId/deletecomment", authMiddleware, userController.deleteComment)


module.exports = router;
