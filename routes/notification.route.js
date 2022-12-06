import express from 'express';
import verifyToken from '../middleware/verifyToken';
import NotificationController from '../controllers/notificationController';
const router = express.Router();

router.get('/get-all/:userId',verifyToken, NotificationController.getAll);
router.post('/create', NotificationController.create);
router.put('/update-read/:notificationId',verifyToken, NotificationController.updateRead);
router.delete('/delete/:notificationId',verifyToken, NotificationController.delete);

export default router;
