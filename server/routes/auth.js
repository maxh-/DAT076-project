const express = require('express');
const router = express.Router();
const models = require('../models');
const passport = require('passport');

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


module.exports = router;
