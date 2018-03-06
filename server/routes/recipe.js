const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/', isAuthenticated, async (req, res, next) => {
  const response = await recipeController.create(req.body, req.user.id);
  res.status(response.code).json(response);
});
/* GET Recipe by id . */
router.get('/search', async (req, res, next) => {
  const response = await recipeController.fuzzyFind(req.query);
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
