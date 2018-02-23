const models = require('../models');


exports.findUserById = async (id) => {
  const user = await models.User.findById(id);
  if(user){
    return {
      success: true,
      code: 201,
      user: user.toJSON()};
  }else {
    return {
      success: false,
      code: 404,
      message: "user not found"
    };
  }
};

exports.register = async (params) => {
  if(params.password === params.password2){
    const res = await models.User.findOrCreate({
      where: {email: params.email},
      defaults:{ password: params.password,
                 firstName: params.firstName,
                 lastName: params.lastName
               }
    });
    if(res[1]){
      const user = res[0];
      return {
        success: true,
        code: 201,
        user: user.toJSON()
      };
    }else{
      return {
        success: false,
        code: 304,
        message: "user already exists"
      };
    }
  }else{
    return {
      success: false,
      code: 400,
      message: "passwords dont match"
    };
  }
};
