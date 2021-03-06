const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { checkSchema, check, oneOf} = require('express-validator/check');
const validate = require('../middlewares/validate');
const recipeSchema = require('../validation-schemas/recipe');


/* GET Recipe by id . */
router.get('/', async (req, res, next) => {
  const response = await recipeController.findAll();
  res.status(response.code).json(response);
});

/* POST create a recipe*/
router.post('/', isAuthenticated, checkSchema(recipeSchema.create), check('ingredients').custom((values) => {
  const ingredients = values.map((value) => {return value.ingredient ? value.ingredient : value.IngredientId;});
  const unique = (new Set(ingredients)).size === values.length;
  if(!unique){
    throw new Error('Ingredients must be unique');
  }
  return unique;
}), oneOf([
  check('ingredients.*.ingredient').exists().not().isEmpty().matches(/^\S+[\S\s.,!?'"#]*$/),
  check('ingredients.*.IngredientId').exists().isInt()
]), validate, async (req, res, next) => {
  const response = await recipeController.create(req.body, req.user.id);
  res.status(response.code).json(response);
});

/* GET top recipes */
router.get('/top', async (req, res, next) => {
  const response = await recipeController.top(req.query);
  res.status(response.code).json(response);
});

/* GET Recipe by id . */
router.get('/search', async (req, res, next) => {
  const response = await recipeController.fuzzyFind(req.query);
  res.status(response.code).json(response);
});

/* GET get uplikes/downlikes for arecipe */ 
router.get("/:id/like",  async (req, res, next) => {
  const response = await recipeController.getLikes(req.params.id);
  res.status(response.code).json(response);
});

/* POST uplike/downlike recipe */ 
router.post("/:id/like", isAuthenticated, async (req, res, next) => {
  const response = await recipeController.like(req.params.id, req.user.id);
  res.status(response.code).json(response);
});

/* POST remove uplike/downlike from a recipe */ 
router.delete("/:id/like", isAuthenticated, async (req, res, next) => {
  const response = await recipeController.removeLike(req.params.id, req.user.id);
  res.status(response.code).json(response);
});

/* GET Recipe by id . */
router.get('/:id', async (req, res, next) => {
  const response = await recipeController.findById(req.params.id);
  res.status(response.code).json(response);
});


/* PUT update a recipe. */
router.put('/:id', isAuthenticated, checkSchema(recipeSchema.update), check('ingredients').custom((values) => {
  const ingredients = values.map((value) => {return value.ingredient ? value.ingredient : value.IngredientId;});
  const unique = (new Set(ingredients)).size === values.length;
  if(!unique){
    throw new Error('Ingredients must be unique');
  }
  return unique;
}), oneOf([
  check('ingredients.*.ingredient').exists().not().isEmpty().matches(/^\S+[\S\s.,!?'"#]*$/),
  check('ingredients.*.IngredientId').exists().isInt()
]), validate, async (req, res, next) => {
  const response = await recipeController.update(req.body, req.params.id, req.user.id);
  res.status(response.code).json(response);
});


module.exports = router;
