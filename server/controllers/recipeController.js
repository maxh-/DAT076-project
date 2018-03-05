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
