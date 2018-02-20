const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET self */
router.get('/', async (req, res, next) => {
  const response = userController.findMe(req.user.id);
  res.json(response);
});

/* POST change password */
router.post('/changePassword', async (req, res, next) => {
  const response = userController.updatePassword(req.body);
  res.json(response);
});

/* POST change user settings */
router.post('/update', async (req, res, next) => {
  const response = userController.update(req.body, req.user.id);
  res.json(response);
});

module.exports = router;
