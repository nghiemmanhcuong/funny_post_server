import Notification from '../models/notification';
import User from '../models/user';

class NotificationController {
    async create(req, res) {
        try {
            const notification = new Notification(req.body);
            await notification.save();
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.params.userId;
            if (userId) {
                const notifications = await Notification.find({receiverId: userId}).sort({createdAt: -1});
                const results = await Promise.all(
                    notifications.map(async (notification) => {
                        const user = await User.findById(notification.senderId).select('-password');
                        return {
                            user: user,
                            ...notification._doc,
                        };
                    }),
                );
                res.status(200).json(results);
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy trang hoặc yêu cầu',
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateRead(req, res) {
        try {
            if (req.params.notificationId) {
                const notification = await Notification.findById(req.params.notificationId);
                if (notification) {
                    await notification.updateOne({read: true});
                    res.status(200).json({success: true, message: 'Update read successfully'});
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'Không tìm thấy trang hoặc yêu cầu',
                    });
                }
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy trang hoặc yêu cầu',
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async delete(req, res) {
        try {
            if (req.params.notificationId) {
                const notification = await Notification.findById(req.params.notificationId);
                if (notification) {
                    await notification.deleteOne({read: true});
                    res.status(200).json({success: true, message: 'Delete read successfully'});
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'Không tìm thấy trang hoặc yêu cầu',
                    });
                }
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy trang hoặc yêu cầu',
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new NotificationController();
