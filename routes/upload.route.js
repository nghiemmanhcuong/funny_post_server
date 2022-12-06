import multer from 'multer';
import express from 'express';
const router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

var upload = multer({storage: storage});

router.post('/', upload.single('file'), (req, res) => {
    try {
        res.status(200).json('upload file successfully');
    } catch (error) {
        console.log(error);
    }
});

export default router;
