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



module.exports = router;
