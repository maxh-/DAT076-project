const models = require('../models');

exports.getAllIngredients = async (id) => {
  const ingredients = await models.Ingredient.findAll({attributes: ['id','name']});
    return {
      success: true,
      code: 200,
      recipe: ingredients
    };
};

exports.getIngredientById = async (id) =>{
  const ingredient = await models.Ingredient.findById(id,
                                                      {attributes: ['id','name']});
  if(ingredient){
    return {
      success: true,
      code: 200,
      user: ingredient
    };
  } else {
    return {
      success: false,
      code: 404,
      message: "ingredient does not exist"
    };
  }

};
