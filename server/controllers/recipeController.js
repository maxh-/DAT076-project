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

exports.findAll = async (id) => {
  const recipes = await models.Recipe.findAll({
    include: [
      models.Step,
      models.Tag,
      {
        model: models.RecipeIngredients,
        include: [models.Ingredient, models.Unit]
      }]
  });
  if(recipes){
    return {
      success: true,
      code: 200,
      recipe: recipes
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
    tweet: params.tweet,
    Steps: params.steps
  }, {
    include: [ models.Step ]
  });

  await recipe.addTags(params.tags);

  // coerce ingredients to fit model
  const ingredients = await ingredientsFromJSON(params.ingredients);
  await recipe.addIngredients(ingredients);
  return {
    success: true,
    code: 201,
    recipe: recipe.toJSON()
  };
};

exports.update = async (params, recipeId, userId) => {
  const recipe = await models.Recipe.findById(recipeId);
  if(recipe === null){
    return {
      success: false,
      code: 404,
      message: "Recipe not found"
    };
  }
  if(recipe.UserId != userId){
    return {
      success: false,
      code: 401,
      message: "Recipe does not belong to this user"
    };
  }
  // update recipe attributes
  recipe.title = params.title ? params.title : recipe.title;
  recipe.timeToComplete = params.timeToComplete ? params.timeToComplete : recipe.timeToComplete;
  recipe.tweet = params.tweet ? params.tweet : recipe.tweet;
  const ingredients = await ingredientsFromJSON(params.ingredients);

  return models.sequelize.transaction((t) =>  {
    // chain all your queries here. make sure you return them.
    return models.Step.destroy(
      {where: {RecipeId:recipeId}},
      {transaction: t}).then(() =>{
        return models.Step.bulkCreate(
          params.steps.map((step) => {
            step.RecipeId = recipeId;
            return step;
          })
          , {transaction: t}).then(()=>{
            return recipe.setTags(
              params.tags,
              {transaction: t}).then(() => {
                return recipe.setIngredients(
                  ingredients,
                  {transaction: t}).then(() => {
                    return recipe.save({transaction: t});
                  });
              });
          });

      });
  }).then(function (result) {
    return {
      success: true,
      code: 200,
      message: "recipe updated"
    };
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
  }).catch(function (err) {
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
    return {
      success: false,
      code: 400,
      err: err
    };
  });

};



/*** HELPER FUNCTIONS ***/

const ingredientsFromJSON = async(ingredients) => {
  return await Promise.all(
    ingredients.map(
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
