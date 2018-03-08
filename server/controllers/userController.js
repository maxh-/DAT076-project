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
    user: user.toJSON()
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

exports.getLikes = async (id) => {
  const user = await models.User.findById(id, {
    include: [{
      model: models.Recipe,
      as: 'likes'
    }]
  });
  return {
    success: true,
    code: 200,
    likes: user.likes
  };
};

exports.getFavorites = async (id) => {
  const user = await models.User.findById(id, {
    include: [{
      model: models.Recipe,
      as: 'favorites'
    }]
  });
  return {
    success: true,
    code: 200,
    favorites: user.favorites
  };
};

exports.favorite = async (recipeId, userId) => {
  const user = await models.User.findById(userId);
  const recipe = await models.Recipe.findById(recipeId);
  if(recipe === null){
    return {
      success: false,
      code: 404,
      message: "could not find recipe"
    };
  }
  await user.addFavorite(recipe, {as: 'favorites'});

  return {
    success: true,
    code: 201,
    message: "recipe has been favorited"
  };
};

exports.removeFavorite = async (recipeId, userId) => {
  await models.Favorites.destroy({where: {userId: userId, recipeId: recipeId}});
  return {
    success: true,
    code: 200,
    message: "favorite has been removed"
  };
};


exports.getRecipes = async (id) => {
  const user = await models.User.findById(id, {
    include: [
      models.Recipe
    ]
  });
  if(user == null){
    return {
      success: false,
      code: 400,
      message: "user does not exist"
    };
  }
  return {
    success: true,
    code: 200,
    message: user.Recipes
  };
};
