const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const isAuthenticated = require('../middlewares/isAuthenticated');


/* GET Recipe by id . */
router.get('/', async (req, res, next) => {
  const response = await recipeController.findAll();
  res.status(response.code).json(response);
});

router.post('/', isAuthenticated, async (req, res, next) => {
  const response = await recipeController.create(req.body, req.user.id);
  res.status(response.code).json(response);
});

/* POST uplike/downlike recipe */ 
router.get("/:id/like",  async (req, res, next) => {
  const response = await recipeController.getLikes(req.params.id);
  res.status(response.code).json(response);
});

/* POST uplike/downlike recipe */ 
router.post("/:id/like", isAuthenticated, async (req, res, next) => {
  const response = await recipeController.like(req.body, req.params.id, req.user.id);
  res.status(response.code).json(response);
});

/* POST uplike/downlike recipe */ 
router.delete("/:id/like", isAuthenticated, async (req, res, next) => {
  const response = await recipeController.removeLike(req.params.id, req.user.id);
  res.status(response.code).json(response);
});

/* POST favorite a recipe */ 
router.post("/:id/favorite", isAuthenticated, async (req, res, next) => {
  const response = await recipeController.favorite(req.params.id, req.user.id);
  res.status(response.code).json(response);
});

/* POST remove favorite */ 
router.delete("/:id/favorite", isAuthenticated, async (req, res, next) => {
  const response = await recipeController.removeFavorite(req.params.id, req.user.id);
  res.status(response.code).json(response);
});

/* GET Recipe by id . */
router.get('/:id', async (req, res, next) => {
  const response = await recipeController.findById(req.params.id);
  res.status(response.code).json(response);
});


/* GET Recipe by id . */
router.put('/:id', isAuthenticated, async (req, res, next) => {
  const response = await recipeController.update(req.body, req.params.id, req.user.id);
  res.status(response.code).json(response);
});

module.exports = router;
