const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const unitController = require('../controllers/unitController');

/* GET users. */
router.get('/', async (req, res, next) => {
  const response = await unitController.getAllUnits();
  res.status(response.code).json(response);
});

/* GET users. */
router.get('/:id', async (req, res, next) => {
  const response = await unitController.getUnitById(req.params.id);
  res.status(response.code).json(response);
});

module.exports = router;
