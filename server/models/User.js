const bcrypt = require('bcrypt-nodejs');

module.exports  = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

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

  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSalt(12, function(err, salt){
      return salt;
    });
    return Promise.resolve(bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
    })
   );
  });

  return User;
};
