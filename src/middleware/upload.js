const util = require('util');
const multer = require('multer');
const maxSize = 2 * 1024 * 1024; // 2MB

// Setup storage path and file name
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/resources/static/assets/uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

// Configura the multer middleware
let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single('file');

// Promisify the middleware so it can be used with async/await
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;