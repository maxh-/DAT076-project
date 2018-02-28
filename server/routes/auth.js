const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const authController = require('../controllers/authController');

/* GET users. */
router.get('/', isAuthenticated, async (req, res, next) => {
  const response = await authController.findUserById(req.user.id);
  res.json(response);
});

/* POST get mah token. */
router.post('/login', async (req, res, next) => {
  const response = await authController.getToken(req.body);
  res.json(response);
});

/* POST register user */
router.post('/register', async (req, res, next) => {
  const response = await authController.register(req.body);
  res.json(response);
});

/* POST forgot password */
router.post('/forgot', async (req, res, next) => {
  const response = await authController.forgotPassword(req.body.email, req.headers.host);
  res.json(response);
});

/* GET reset password page */
router.get('/reset/:token', async (req, res, next) => {
  const response = await authController.checkResetToken(req.params.token);
  res.json(response);
});

/* POST reset password */
router.post('/reset/:token', async (req, res, next) => {
  const response = await authController.resetPassword(req.body, req.params.token);
  res.json(response);
});


module.exports = router;
