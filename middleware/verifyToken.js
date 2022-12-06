import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    // get token form header
    const requestHeader = req.header('Authorization');
    const token = requestHeader && requestHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Access token not found!',
        });
    } else {
        try {
            const decoded = jwt.verify(token,'8912heg#@$#@asdgasada');
            req.userId = decoded.userId;
            next(); 
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'invalid access token!',
            });
        }
    }
};

export default verifyToken;