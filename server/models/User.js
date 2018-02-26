const bcrypt = require('bcrypt-nodejs');

module.exports  = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING(127),
      isEmail: true,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName:{
      type: DataTypes.STRING
    },
    lastName:{
      type: DataTypes.STRING
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
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
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  // associations
  User.associate = function(models){
    models.User.hasMany(models.Recipe);
  };

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
