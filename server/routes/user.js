const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET all users */
router.get('/', async (req, res, next) => {
  const response = await userController.findAll();
  res.status(response.code).json(response);
});

/* GET recipes made  by user. */
router.get('/:id/recipes', async (req, res, next) => {
  const response = await userController.getRecipes(req.params.id);
  res.status(response.code).json(response);
});

/* GET a user by id. */
router.get('/:id', async (req, res, next) => {
  const response = await userController.findUser(req.params.id);
  res.status(response.code).json(response);
});

module.exports = router;
