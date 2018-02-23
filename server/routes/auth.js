const express = require('express');
const router = express.Router();
const passport = require('passport');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authController = require('../controllers/authController');

/* GET users. */
router.get('/', isAuthenticated, async (req, res, next) => {
  const response = await authController.findUserById(req.user.id);
  res.json(response);
});

/* POST login */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.json({
        success: false,
        error: err
      });
    }
    if (!user) {
      return res.json({
        success: false,
        code: 400,
        message: "email or password is invalid"
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.json({
          success: false,
          error: err
        });
      }
      return res.json({
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
  res.json({
    success: true,
    code: 200,
    message: "logout"
  });
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
