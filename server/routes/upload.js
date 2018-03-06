const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/', uploadController.upload.single('file'), (req, res) => {
  const response = uploadController(req);
  res.status(response.code).send(response);
});

module.exports = router;
