import express from 'express';
import verifyToken from '../middleware/verifyToken';
import PostController from '../controllers/postController';

const router = express.Router();

router.post('/create',verifyToken, PostController.create);
router.get('/get-posts/:userId',verifyToken, PostController.getPosts);
router.get('/get-post/:postId',verifyToken, PostController.getPostById);
router.get('/get-comments/:postId',verifyToken, PostController.getPostComments);
router.put('/update/:postId',verifyToken, PostController.update);
router.delete('/delete/:postId',verifyToken, PostController.delete);
router.post('/create',verifyToken, PostController.create);
router.get('/timeline-post',verifyToken, PostController.getTimelinePost);
router.put('/like-post/:postId',verifyToken, PostController.likePost);

export default router;
