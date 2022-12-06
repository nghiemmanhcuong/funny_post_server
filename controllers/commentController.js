import Comment from '../models/comment';

class CommentController {
    async create(req, res) {
        try {
            const newComment = new Comment(req.body);
            await newComment.save();

            res.status(200).json(newComment);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const commentId = req.params.commentId;
            if (commentId) {
                const comment = await Comment.findById(commentId);
                if (comment) {
                    const newComment = await comment.updateOne(
                        {content: req.body.content},
                        {new: true},
                    );
                    res.status(200).json(newComment);
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
            const commentId = req.params.commentId;
            if (commentId) {
                const comment = await Comment.findById(commentId);
                if (comment) {
                    await comment.deleteOne();
                    res.status(200).json({
                        success: true,
                        message: 'Xoá bình luận thành công',
                    });
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

export default new CommentController();
