import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/upload');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({storage: storage});

export default upload;