const multer = require('multer');
const path = require('path');

const fileUploadConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './temp')
  },

  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  
  // Updated filename method
  filename: function (req, file, cb) {
    cb(null, `${file.originalname.split('.')[0].replace(/[^a-z0-9]/gi, '_').toLowerCase()}${path.extname(file.originalname)}`)
  },
});

const fileUploader = multer({ storage: fileUploadConfig });

module.exports = fileUploader;