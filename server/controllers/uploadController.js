const fs = require('fs');
const multer = require('multer');

/**
 * Stores files POSTed to /upload.
 * Put the file in field 'file' and the name in field 'name'.
 */
const img_dir = process.env.NODE_ENV == 'production' ? '/../../client/build/img/': '/../../client/public/img/';
const UPLOAD_DIR = __dirname + img_dir;
const MAX_SIZE = 5242880; // 5 mb
const ALLOWED_EXT = [
  'jpg',
  'jpeg',
  'png'
];

const upload = multer({
  size: MAX_SIZE
});

const uploadController = (req, cb) => {
  const fileName = UPLOAD_DIR + req.body.name;
  const ext = fileName.split('.').slice(-1)[0];

  if (!ALLOWED_EXT.includes(ext)) {
    return {
      success: false,
      code: 422,
      message: 'file extension not allowed.'
    };
  }
    
  try {
    fs.writeFileSync(fileName, req.file.buffer);
    return {
      success: true,
      code: 200,
      message: 'file uploaded.',
      file: `/img/${req.body.name}`
    };
  }
  catch (e) {
    // error writing the file to disk
    return {
      success: false,
      code: 500,
      message: 'could not upload file.'
    };
  }
};

module.exports = uploadController;
module.exports.upload = upload;
