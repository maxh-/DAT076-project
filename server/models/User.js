const bcrypt = require('bcrypt-nodejs');

module.exports  = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
      notNull: true
    },
    password: {
      type: DataTypes.STRING,
      notNull: true
    },
    firstName:{
      type: DataTypes.STRING
    },
    lastName:{
      type: DataTypes.STRING
    }
  });

  // Dont return password to frontend
  // this makes the password still useable inside the backend! 
  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  // check if password is valid
  User.validPassword = function(password, passwd, done, user){
    bcrypt.compare(password, passwd, function(err, isMatch){
      if(err) console.log(err);
      if(isMatch) {
        return done(null, user);
      }else{
        return done(null, false);
      }
    });
  };

  // salt password before create
  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSalt(12, function(err, salt){
      return salt;
    });
    return Promise.resolve(bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
    }));
  });

  return User;
};
