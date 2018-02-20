const bcrypt = require('bcrypt-nodejs');

module.exports  = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(255)
    },
    email: {
      type: DataTypes.STRING(127),
      isEmail: true,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    firstName:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    }
  });

  // this makes the password still useable inside the backend! 
  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    delete values.resetPasswordExpires;
    delete values.resetPasswordToken;
    return values;
  };

  // check if password is valid for use with passport
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

  // check if passwords are equal
  User.comparePassword = function(password, passwd){
    return new Promise(resolve => {
      bcrypt.compare(password, passwd, (err, isMatch) => {
        if(err) console.log(err);
        resolve(isMatch);
      });
    });
  };

  // salt password before create
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};

const hashPassword = (user, options) =>{
  if(user.changed('password')){
    const salt = bcrypt.genSalt(12, function(err, salt){
      return salt;
    });
    return Promise.resolve(bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
    }));
  }
};
