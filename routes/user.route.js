import express from 'express';
import UserController from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();

router.get('/get-user', verifyToken, UserController.getUser);
router.get('/get-friends', verifyToken, UserController.getFriends);
router.get('/search-friends', verifyToken, UserController.seacrhFriends);
router.get('/search-friends/:username', verifyToken, UserController.seacrhFriends);
router.get('/get-by-id/:userId', verifyToken, UserController.getUserById);
router.get('/get-images', verifyToken, UserController.getImages);
router.get('/get-user-in-post/:userId', verifyToken, UserController.getUserInPost);
router.put('/follow/:followerUserId', verifyToken, UserController.follow);
router.put('/unfollow/:unfollowUserId', verifyToken, UserController.unfollow);
router.put('/update-info', verifyToken, UserController.updateUserInfo);

export default router;
