const passport = require('passport');
const models = require('../../models');
const LocalStrategy = require('passport-local').Strategy;

// used to serialize the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});


// used to deserialize the user
passport.deserializeUser(function(id, done) {
  models.User.findById(id).then(function(user) {
    if(user){
      done(null, user.get());
    }
    else{
      done(user.errors,null);
    }
  });
});

passport.use(new LocalStrategy(
  function(username, password, done){
    models.User.findOne({where:{username:username}}).then(user => {
      passwd = user ? user.password : '';
      isMatch = models.User.validPassword(password, passwd, done, user);
    });
  }
));
