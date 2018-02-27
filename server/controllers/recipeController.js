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
          var res = await models.Ingredient.findOrCreate(
            {where: {name: ingredient.ingredient}
            });
          ingredient.IngredientId = res[0].id;
        }
        //const recipeIngredient = await models.RecipeIngredients.create(ingredient);
        //return recipeIngredient;
        res[0].RecipeIngredients = ingredient;
        console.log(res[0].toJSON());
        return res[0];

      })
  );
  console.log(recipeIngredients);
  await recipe.addIngredients(recipeIngredients);
  return {
    success: true,
    code: 201,
    recipe: recipe.toJSON()
  };
};
