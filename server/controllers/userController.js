const models = require('../models');

exports.findMe = async (id) =>{
  const user = await models.User.findById(id);
  if(user){
    return {
      success: true,
      code: 200,
      user: user.toJSON()
    };
  } else {
    return {
      success: false,
      code: 404,
      message: "user does not exist"
    };
  }

};

exports.updatePassword = async (params, id) => {
  if(params.password === params.password2){
    const user = await models.User.findById(id);
    const isMatch = await models.User.comparePassword(params.oldPassword, user.password);

    if(isMatch){
      user.password = params.password;
      await user.save();
      return {
        success: true,
        code: 201,
        message: "password updated"
      };
    }else{
      return {
        success: false,
        code: 400,
        message: "old password is not correct"
      };
    }

  }else{
    return {
      success: false,
      code: 400,
      message: "passwords do not match"
    };
  }
};

exports.update = async (params, id) => {
  if(params.firstName == "" || params.firstName == null ||
     params.lastName == "" || params.lastName == null){
    return {
      success: false,
      code: 401,
      message: "firstname or lastname cant be empty"
    };
  }
  const user = await models.User.findById(id);
  user.firstName = params.firstName;
  user.lastName = params.lastName;

  await user.save();
  return{
    success: true,
    code: 200,
    message: "user updated"
  };
};


exports.findUser = async (id) => {
  const user = await models.User.findOne({
    where: {id: id},
    attributes: ['id', 'firstName', 'lastName']});
  if(user){
    return {
      success: true,
      code: 200,
      user: user
    };
  } else {
    return {
      success: false,
      code: 404,
      message: "user does not exist"
    };
  }
};

exports.findAll = async () => {
  const users = await models.User.findAll({
    attributes: ['id', 'firstName', 'lastName']});
  if(users){
    return {
      success: true,
      code: 200,
      user: users
    };
  } else {
    return {
      success: false,
      code: 404,
      message: "no user exists"
    };
  }
};
