const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const ingredientController = require('../controllers/ingredientController');

/* GET users. */
router.get('/', async (req, res, next) => {
  const response = await ingredientController.getAllIngredients();
  res.status(response).json(response);
});

/* GET users. */
router.get('/:id', async (req, res, next) => {
  const response = await ingredientController.getIngredientById(req.params.id);
  res.status(response).json(response);
});

module.exports = router;
