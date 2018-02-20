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
  const response = user.controller.updatePassword(req.body);
  res.json(response);
});

/* POST change user settings */
router.post('/update', async (req, res, next) => {
  const user = await models.User.findById(req.user.id);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  await user.save();
  res.send(user);
});

module.exports = router;
