const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const authController = require('../controllers/authController');
const { checkSchema, validationResult } = require('express-validator/check');
const authSchema = require('../validation-schemas/auth');

/* GET users. */
router.get('/', isAuthenticated, async (req, res, next) => {
  const response = await authController.findUserById(req.user.id);
  res.status(response.code).json(response);
});

/* POST get mah token. */
router.post('/login', async (req, res, next) => {
  const response = await authController.getToken(req.body);
  res.status(response.code).json(response);
});

/* POST register user */
router.post('/register', checkSchema(authSchema.register), async (req, res, next) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    res.status(400).json({
      success: false,
      code: 400,
      validationErrors: validation.array()
    });
  }
  const response = await authController.register(req.body);
  res.status(response.code).json(response);
});

/* POST forgot password */
router.post('/forgot', checkSchema(authSchema.forgot), async (req, res, next) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    res.status(400).json({
      success: false,
      code: 400,
      validationErrors: validation.array()
    });
  }
  const response = await authController.forgotPassword(req.body.email);
  res.status(response.code).json(response);

});

/* GET reset password page */
router.get('/reset/:token', async (req, res, next) => {
  const response = await authController.checkResetToken(req.params.token);
  res.status(response.code).json(response);
});

/* POST reset password */
router.post('/reset/:token', checkSchema(authSchema.reset), async (req, res, next) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    res.status(400).json({
      success: false,
      code: 400,
      validationErrors: validation.array()
    });
  }
  const response = await authController.resetPassword(req.body, req.params.token);
  res.status(response.code).json(response);
});


module.exports = router;
