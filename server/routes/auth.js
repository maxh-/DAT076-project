const express = require('express');
const router = express.Router();
const models = require('../models');
const passport = require('passport');
const isAuthenticated = require('../middlewares/isAuthenticated');
const authController = require('../controllers/authController');

/* GET users. */
router.get('/', isAuthenticated, async (req, res, next) => {
  const response = await authController.findUserById(req.user.id);
  res.json(response);
});

/* POST login */
// TODO: redirects needs to change to correct places
router.post('/login',
  passport.authenticate('local', {successRedirect: '/auth',
                                  failRedirect: '/welcome'}));

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


module.exports = router;
