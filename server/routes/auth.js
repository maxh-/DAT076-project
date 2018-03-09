const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const authController = require('../controllers/authController');
const { checkSchema } = require('express-validator/check');
const validate = require('../middlewares/validate');
const authSchema = require('../validation-schemas/auth');

/* GET users. */
router.get('/', isAuthenticated, async (req, res, next) => {
  const response = await authController.findUserById(req.user.id);
  res.status(response.code).json(response);
});

/* POST get mah token. */
router.post('/login', checkSchema(authSchema.login), validate,async (req, res, next) => {
  const response = await authController.getToken(req.body);
  res.status(response.code).json(response);
});

/* POST register user */
router.post('/register', checkSchema(authSchema.register), validate, async (req, res, next) => {
  const response = await authController.register(req.body);
  res.status(response.code).json(response);
});

/* POST forgot password */
router.post('/forgot', checkSchema(authSchema.forgot), validate, async (req, res, next) => {
  const response = await authController.forgotPassword(req.body.email);
  res.status(response.code).json(response);

});

/* GET reset password page */
router.get('/reset/:token', async (req, res, next) => {
  const response = await authController.checkResetToken(req.params.token);
  res.status(response.code).json(response);
});

/* POST reset password */
router.post('/reset/:token', checkSchema(authSchema.reset), validate, async (req, res, next) => {
  const response = await authController.resetPassword(req.body, req.params.token);
  res.status(response.code).json(response);
});


module.exports = router;
