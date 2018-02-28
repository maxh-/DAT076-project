const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET all users */
router.get('/all', async (req, res, next) => {
  const response = await userController.findAll();
  res.json(response);
});

/* GET a user by id. */
router.get('/:id', async (req, res, next) => {
  const response = await userController.findUser(req.params.id);
  res.json(response);
});

module.exports = router;
