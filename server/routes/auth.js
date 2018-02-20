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
  const buf = await crypto.randomBytes(20);
  const token = buf.toString('hex');

  const user = await models.User.find({where:{email:req.body.email}});
  if(user){
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // one hour

    await user.save();
  }else{
    res.status(401).send("no user with that email exists");
  }
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noreplyrecept@gmail.com',
      pass: 'testpass'
    }
  });
  const mailOptions = {
    to: user.email,
    from: 'noreplyrecept@gmail.com',
    subject: 'Receptappen Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + req.headers.host + '/auth/reset/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  await smtpTransport.sendMail(mailOptions);
  res.redirect('/welcome'); // TODO: fix to correct redirect
});

/* GET reset password page */
router.get('/reset/:token', (req, res, next) => {
  models.User.find({
    where:{resetPasswordToken:req.params.token,
           resetPasswordExpires: {$gt: Date.now()}}
  }).then(user => {
    if(user){
      res.redirect('/welcome'); // TODO: fix correct redirect (password reset form)
    }else{
      res.status(400).send("token expired or does not exist");
    }
  });
});

/* POST reset password */
router.post('/reset/:token', async (req, res, next) => {
  const user = await models.User.find({
    where:{resetPasswordToken:req.params.token,
           resetPasswordExpires: {$gt: Date.now()}}
  });
  if(user){
    if(req.body.password === req.body.password2){
      user.password = req.body.password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();
    }else{
      res.status(400).send("passwords do not match");
    }
  }else{
    res.status(400).send("token expired or does not exist");
  }

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noreplyrecept@gmail.com',
      pass: 'testpass'
    }
  });
  const mailOptions = {
    to: user.email,
    from: 'noreplyrecept@gmail.com',
    subject: 'Your password has been changed',
    text: 'Hello,\n\n' +
      'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
  };
  await smtpTransport.sendMail(mailOptions);
  res.redirect('/welcome'); // TODO: fix to correct redirect
});


module.exports = router;
