import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthController {
    async register(req, res) {
        try {
            const {email, password, lastName} = req.body;
            const user = await User.findOne({email});
            if (user) {
                res.status(403).json({
                    success: false,
                    message: 'Email này đã được sử dụng vui lòng chọn email khác',
                });
            } else {
                if (!email || !password || !lastName) {
                    res.status(403).json({
                        success: false,
                        message: 'Nhập thiếu thông tin tài khoản',
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    req.body.password = hashPassword;
                    const newUser = new User(req.body);
                    await newUser.save();

                    res.status(200).json({
                        success: true,
                        data: {
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            profilePicture: newUser.profilePicture,
                        },
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                res.status(403).json({
                    success: false,
                    message: 'Nhập thiếu thông tin email hoặc mật khẩu',
                });
            } else {
                const user = await User.findOne({email});
                if (user) {
                    const validiti = await bcrypt.compare(password, user.password);
                    if (validiti) {
                        const token = jwt.sign(
                            {
                                userId: user._id,
                            },
                            '8912heg#@$#@asdgasada',
                        );

                        res.status(200).json({
                            success: true,
                            data: {
                                _id:user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                profilePicture: user.profilePicture,
                                isAdmin: user.isAdmin,
                            },
                            token: token,
                        });
                    } else {
                        res.status(403).json({
                            success: false,
                            message: 'Sai email hoặc mật khẩu',
                        });
                    }
                } else {
                    res.status(403).json({
                        success: false,
                        message: 'Sai email hoặc mật khẩu',
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new AuthController();
