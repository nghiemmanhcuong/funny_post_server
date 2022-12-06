import express from 'express';
import commentController from '../controllers/commentController'
const router = express.Router();

router.post('/create',commentController.create);
router.put('/update/:commentId',commentController.update);
router.delete('/delete/:commentId',commentController.delete);

export default router