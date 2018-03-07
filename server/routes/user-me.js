const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET self */
router.get('/', async (req, res, next) => {
  const response = await userController.findMe(req.user.id);
  res.status(response.code).json(response);
});

/* POST change user settings */
router.post('/', async (req, res, next) => {
  const response = await userController.update(req.body, req.user.id);
  res.status(response.code).json(response);
});

/* POST change password */
router.post('/change-password', async (req, res, next) => {
  const response = await userController.updatePassword(req.body, req.user.id);
  res.status(response.code).json(response);
});

/* GET favorite recipes */ 
router.get("/favorite", async (req, res, next) => {
  const response = await userController.getFavorites(req.user.id);
  res.status(response.code).json(response);
});

/* POST favorite a recipe */ 
router.post("/favorite", async (req, res, next) => {
  const response = await userController.favorite(req.body.recipeId, req.user.id);
  res.status(response.code).json(response);
});

/* POST remove favorite */ 
router.delete("/favorite", async (req, res, next) => {
  const response = await userController.removeFavorite(req.body.recipeId, req.user.id);
  res.status(response.code).json(response);
});



module.exports = router;
