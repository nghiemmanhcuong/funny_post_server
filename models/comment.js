import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Comments = new Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            maxLength: 255,
            required: true,
        },
    },
    {timestamps: true},
);

export default mongoose.model('comments', Comments);
