const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post("/create", isAuthenticated, async (req, res, next) => {
  const response = await recipeController.create(req.body, req.user.id);
  res.status(response.code).json(response);
});


/* GET Recipe by id . */
router.get('/:id', async (req, res, next) => {
  const response = await recipeController.findById(req.params.id);
  res.status(response.code).json(response);
});

module.exports = router;
