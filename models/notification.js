import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Notifications = Schema(
    {
        senderId: {
            type: String,
            required: true,
        },
        receiverId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            maxLength: 255,
            required: true,
        },
        link: {
            type: String,
            maxLength: 255,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true},
);

export default mongoose.model('notifications', Notifications);
