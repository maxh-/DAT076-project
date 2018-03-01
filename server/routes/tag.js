const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

/* GET all tags. */
router.get('/', async (req, res, next) => {
  const response = await tagController.getAllTags();
  res.status(response.code).json(response);
});

/* GET tag by id. */
router.get('/:id', async (req, res, next) => {
  const response = await tagController.getTagById(req.params.id);
  res.status(response.code).json(response);
});


module.exports = router;
