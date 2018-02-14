const express = require('express');
const router = express.Router();
const models = require('../models');
const passport = require('passport');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

/* GET users. */
router.get('/', (req, res, next) => {
  if(req.user){
    res.send("you are logged in as " +req.user.email);
  }else{
    res.send(403).send("you are not logged in");
  }
});

/* POST login */
// TODO: redirects needs to change to correct places
router.post('/login',
  passport.authenticate('local', {successRedirect: '/auth',
                                  failRedirect: '/welcome'}));

/* GET logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/auth');
});

/* POST register user */
router.post('/register', (req, res, next) => {
  if(req.body.password === req.body.password2){
    models.User.findOrCreate({where: {email: req.body.email},
                              defaults:{ password: req.body.password,
                                         firstName: req.body.firstName,
                                         lastName: req.body.lastName
                                       }}).spread((user, created) => {
      if(created){
        res.send(user);
      }else{
        res.status(400).send("User already exists");
      }
    });
  }else{
    res.status(400).send("passwords dont match");
  }
});

/* POST forgot password */
router.post('/forgot', (req, res, next) => {
  async.waterfall([
    function(done){
      crypto.randomBytes(20, function(err, buf) {
        const token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done){
      models.User.find({where:{email:req.body.email}}).then(user => {
        if(user){
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 36000; // one hour

          user.save().then(() =>{
            done(null, token, user);
          });
        }else{
          res.status(401).send("no user with that email exists");
        }
      });
    },
    function(token, user, done) {
      const smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'gmail',
        auth: {
          user: 'noreplyrecept@gmail.com',
          pass: 'testpass'
        }
      });
      const mailOptions = {
        to: user.email,
        from: 'noreplyrecept@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err, 'done');
      });
    }
  ],
  function(err) {
    if (err) return next(err);
    res.redirect('/welcome'); // TODO: fix to correct redirect
  });

});



module.exports = router;
