const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkSchema } = require('express-validator/check');
const validate = require('../middlewares/validate');
const userSchema = require('../validation-schemas/user');

/* GET self */
router.get('/', async (req, res, next) => {
  const response = await userController.findMe(req.user.id);
  res.status(response.code).json(response);
});

/* POST change user settings */
router.post('/', checkSchema(userSchema.update), validate, async (req, res, next) => {
  const response = await userController.update(req.body, req.user.id);
  res.status(response.code).json(response);
});

/* POST change password */
router.post('/change-password', checkSchema(userSchema.changePassword), validate, async (req, res, next) => {
  const response = await userController.updatePassword(req.body, req.user.id);
  res.status(response.code).json(response);
});

/* GET favorite recipes */ 
router.get("/likes", async (req, res, next) => {
  const response = await userController.getLikes(req.user.id);
  res.status(response.code).json(response);
});

/* GET favorite recipes */ 
router.get("/favorite", async (req, res, next) => {
  const response = await userController.getFavorites(req.user.id);
  res.status(response.code).json(response);
});

/* POST favorite a recipe */ 
router.post("/favorite", checkSchema(userSchema.favorite), validate, async (req, res, next) => {
  const response = await userController.favorite(req.body.recipeId, req.user.id);
  res.status(response.code).json(response);
});

/* POST remove favorite */ 
router.delete("/favorite", checkSchema(userSchema.favorite), validate, async (req, res, next) => {
  const response = await userController.removeFavorite(req.body.recipeId, req.user.id);
  res.status(response.code).json(response);
});



module.exports = router;
