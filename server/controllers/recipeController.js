const models = require('../models');

exports.findById = async (id) => {
  const recipe = models.Recipe.findById(id);
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
  // Find or create tags
  const tags = await Promise.all(
    params.tags.map(
      async (tag) => {
        const res = await models.Tag.findOrCreate({where:tag});
        return res[0];
      })
  );
  await recipe.addTags(tags);
  // create recipeIngredients from supplied ingredients
  const recipeIngredients = await Promise.all(
    params.ingredients.map(
      async (ingredient) => {
        if(ingredient.IngredientId === undefined){
          const res = await models.Ingredient.findOrCreate(
            {where: {name: ingredient.ingredient}
            });
          ingredient.IngredientId = res[0].id;
        }
        const recipeIngredient = await models.RecipeIngredients.create(ingredient);
        return recipeIngredient;
      })
  );
  await recipe.addRecipeIngredients(recipeIngredients);
  return {
    success: true,
    code: 201,
    recipe: recipe.toJSON()
  };
};
