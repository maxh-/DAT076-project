const models = require('../models');

exports.findById = async (id) => {
  const recipe = await models.Recipe.findById(id, {
    include: [
      models.Step,
      models.Tag,
      {
        model: models.RecipeIngredients,
        include: [models.Ingredient, models.Unit]
      }]
  });
  if(recipe){
    return {
      success: true,
      code: 200,
      recipe: recipe.toJSON()
    };
  } else {
    return {
      success: false,
      code: 404,
      message: "recipe not found"
    };
  }
};

exports.create = async (params, userId) => {
  const recipe = await models.Recipe.create({
    UserId: userId,
    title: params.title,
    timeToComplete: params.timeToComplete,
    Steps: params.steps
  }, {
    include: [ models.Step ]
  });

  await recipe.addTags(params.tags);

  // coerce ingredients to fit model
  const ingredients = await Promise.all(
    params.ingredients.map(
      async (recipeIngredient) => {
        let ingredient = {};
        if(recipeIngredient.IngredientId !== undefined){
          ingredient = await models.Ingredient.findById(recipeIngredient.IngredientId);
        }else{
          var res = await models.Ingredient.findOrCreate(
            {where: {name: recipeIngredient.ingredient}
            });
          ingredient = res[0];
        }
        ingredient.RecipeIngredients = recipeIngredient;
        return ingredient;

      })
  );
  await recipe.addIngredients(ingredients);
  return {
    success: true,
    code: 201,
    recipe: recipe.toJSON()
  };
};

exports.getLikes = async (id) => {
  const upLikes = await models.Likes.count({where: {recipeId: id, kind: 'up'}});
  const downLikes = await models.Likes.count({where: {recipeId: id, kind: 'down'}});
  const total = upLikes - downLikes;
  return {
    success: true,
    code: 200,
    likes: {
      total: total,
      up: upLikes,
      down: downLikes
    }
  };
};

exports.like = async (params, recipeId, userId) => {
  const user = await models.User.findById(userId);
  const recipe = await models.Recipe.findById(recipeId);
  if(recipe === null){
    return {
      success: false,
      code: 404,
      message: "could not find recipe"
    };
  }
  recipe.Likes = {
    kind: params.kind
  };

  await user.addLike(recipe, {as: 'likes'});

  return {
    success: true,
    code: 201,
    message: "recipe has been " + params.kind + "liked"
  };
};

exports.removeLike = async (recipeId, userId) => {
  await models.Likes.destroy({where: {userId: userId, recipeId: recipeId}});
  return {
    success: true,
    code: 200,
    message: "like has been removed"
  };
};
