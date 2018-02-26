const express = require('express');
const router = express.Router();
const passport = require('passport');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authController = require('../controllers/authController');

/* GET users. */
router.get('/', isAuthenticated, async (req, res, next) => {
  const response = await authController.findUserById(req.user.id);
  res.status(response.code).json(response);
});

/* POST login */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(err.code).json({
        success: false,
        error: err
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "email or password is invalid"
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(err.code).json({
          success: false,
          error: err
        });
      }
      return res.status(200).json({
        success: true,
        code: 200,
        user: user.toJSON()
      });
    });
  })(req, res, next);
});


/* GET logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({
    success: true,
    code: 200,
    message: "logout"
  });
});

/* POST register user */
router.post('/register', async (req, res, next) => {
  const response = await authController.register(req.body);
  res.status(response.code).json(response);
});

/* POST forgot password */
router.post('/forgot', async (req, res, next) => {
  const response = await authController.forgotPassword(req.body.email, req.headers.host);
  res.status(response.code).json(response);
});

/* GET reset password page */
router.get('/reset/:token', async (req, res, next) => {
  const response = await authController.checkResetToken(req.params.token);
  res.status(response.code).json(response);
});

/* POST reset password */
router.post('/reset/:token', async (req, res, next) => {
  const response = await authController.resetPassword(req.body, req.params.token);
  res.status(response.code).json(response);
});


module.exports = router;
