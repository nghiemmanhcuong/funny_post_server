import User from '../models/user';
import Post from '../models/post';

class UserController {
    async getUserInPost(req, res) {
        try {
            const user = await User.findById(req.params.userId).select('-password');
            if (user) {
                res.status(200).json({
                    _id: user._id,
                    email: user.email,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    profilePicture: user.profilePicture,
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

    async getUser(req, res) {
        try {
            const limit = 8;
            const currPage = req.query.page ? req.query.page : 1;

            const currUser = await User.findById(req.userId).select('-password');
            const users = await User.find({
                $and: [{_id: {$ne: req.userId}}, {_id: {$nin: currUser.followings}}],
            })
                .select('-password')
                .skip(limit * currPage - limit)
                .limit(limit)
                .sort({createdAt: -1});
            const countDocuments = await User.countDocuments({
                $and: [{_id: {$ne: req.userId}}, {_id: {$nin: currUser.followings}}],
            });

            res.status(200).json({
                success: true,
                data: users,
                pages: Math.ceil(countDocuments / limit),
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.userId).select('-password');
            if (user) {
                res.status(200).json(user);
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

    async follow(req, res) {
        try {
            if (req.params.followerUserId) {
                if (req.params.followerUserId == req.userId) {
                    res.status(200).json({
                        success: false,
                        message: 'Hành động bị cấm',
                    });
                } else {
                    const currUser = await User.findById(req.userId);
                    const followUser = await User.findById(req.params.followerUserId);

                    console.log(currUser);
                    console.log(followUser);

                    if (!currUser.followings.includes(req.params.followerUserId)) {
                        await followUser.updateOne({$push: {followers: req.userId}});
                        await currUser.updateOne({$push: {followings: req.params.followerUserId}});

                        res.status(200).json({success: true});
                    }
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

    async unfollow(req, res) {
        try {
            if (req.params.unfollowUserId) {
                if (req.params.unfollowUserId == req.userId) {
                    res.status(200).json({
                        success: false,
                        message: 'Hành động bị cấm',
                    });
                } else {
                    const currUser = await User.findById(req.userId);
                    const followUser = await User.findById(req.params.unfollowUserId);

                    if (currUser.followings.includes(req.params.unfollowUserId)) {
                        await followUser.updateOne({$pull: {followers: req.userId}});
                        await currUser.updateOne({$pull: {followings: req.params.unfollowUserId}});

                        res.status(200).json({success: true});
                    }
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

    async getFriends(req, res) {
        try {
            const currUser = await User.findById(req.userId);
            const friends = await User.find({_id: {$in: currUser.followings}});

            res.status(200).json(friends);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getImages(req, res) {
        try {
            const posts = await Post.find({userId: req.userId});
            const userImages = posts.map((post) => post.image);

            res.status(200).json(userImages.filter((image) => image !== ''));
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateUserInfo(req, res) {
        try {
            await User.findByIdAndUpdate(req.userId, req.body);
            res.status(200).json({
                success: true,
                message: 'Thay đổi thông tin thành công',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async seacrhFriends(req, res) {
        const username = req.params.username ? req.params.username : '';
        try {
            const users = await User.find({
                $and: [{$text: {$search: username}}, {_id: {$nin: req.userId}}],
            }).select('-password');
            if (users && users.length > 0) {
                res.status(200).json(users);
            } else {
                res.status(200).json([]);
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new UserController();
