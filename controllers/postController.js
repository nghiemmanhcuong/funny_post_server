import Post from '../models/post';
import User from '../models/user';
import Comment from '../models/comment';

class PostController {
    async create(req, res) {
        try {
            const {description} = req.body;
            if (description) {
                req.body.userId = req.userId;
                const newPost = new Post(req.body);
                await newPost.save();
                res.status(200).json({
                    success: true,
                    data: newPost,
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Lỗi thông tin truyền lên',
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const postId = req.params.postId;
            const post = await Post.findById(postId);

            await post.updateOne(req.body.data);
            res.status(200).json({
                success: true,
                message: 'Sửa bài viết thành công',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async delete(req, res) {
        try {
            const postId = req.params.postId;
            const post = await Post.findById(postId);
            await post.deleteOne();
            res.status(200).json({
                success: true,
                message: 'Xoá bài viết thành công',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getPostById(req, res) {
        try {
            if (req.params.postId) {
                const post = await Post.findById(req.params.postId);
                if (post) {
                    res.status(200).json(post);
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

    async getTimelinePost(req, res) {
        try {
            const user = await User.findById(req.userId);
            if (user) {
                const currentUserPosts = await Post.find({userId: req.userId}).sort({
                    createdAt: -1,
                });

                const followingPosts = await Post.find({userId: {$in: user.followings}}).sort({
                    createdAt: -1,
                });

                res.status(200).json(followingPosts.concat(currentUserPosts));
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

    async getPosts(req, res) {
        try {
            if (req.params.userId) {
                const posts = await Post.find({userId: req.params.userId}).sort({createdAt: -1});
                res.status(200).json(posts);
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

    async likePost(req, res) {
        try {
            const postId = req.params.postId;
            if (postId) {
                const post = await Post.findById(postId);
                const postLiked = post.liked;

                if (postLiked.includes(req.userId)) {
                    const newPostLiked = postLiked.filter((userId) => userId != req.userId);
                    await post.updateOne({liked: newPostLiked});
                } else {
                    postLiked.push(req.userId);
                    await post.updateOne({liked: postLiked});
                }
                res.status(200).json({success: true});
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

    async getPostComments(req, res) {
        try {
            const postId = req.params.postId;
            if (postId) {
                const post = await Post.findById(postId);
                const comments = await Comment.find({postId: postId});
                const results = await Promise.all(
                    comments.map(async (comment) => {
                        const user = await User.findById(comment.userId).select('-password');
                        return {
                            _id:comment._id,
                            postId: comment.postId,
                            user: {
                                _id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                profilePicture: user.profilePicture,
                            },
                            content: comment.content,
                            createdAt: comment.createdAt
                        };
                    }),
                );
                res.status(200).json({
                    comments:results,
                    postUserId:post.userId
                });
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

export default new PostController();
