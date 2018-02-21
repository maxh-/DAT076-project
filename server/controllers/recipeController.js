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
    title: "hello",
    timeToComplete: 200,
    Steps: params.steps
  }, {
    include: [ models.Step]
  });
  // Find or create tags
  const tags = await Promise.all(
    params.tags.map(
      async (tag) => {
        const res = await models.Tag.findOrCreate({where:tag});
        return res[0];
      })
  );
  recipe.addTags(tags);
  await models.Unit.create({abbreviation: "dl", name: "deciliter"});
  const tmp = [
    {
      number:1,
      amount:2,
      UnitId:1,
      Ingredient: "hello"
    }
  ];
  const ingredients = await Promise.all(
    tmp.map(
      async (recipeIngredient) => {
        if(recipeIngredient.IngredientId !== undefined){
          const ingredient = await models.Ingredient.findById(tmp.ingredientId);
          return ingredient;
        }else{
          const res = await models.Ingredient.findOrCreate(
            {where: {name: recipeIngredient.Ingredient}
            });
          return res[0];
        }
      })
  );
  
  recipe.addRecipeIngredients(ingredients);
  return recipe.toJSON();
};
