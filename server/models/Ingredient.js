module.exports  = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });

  // associations
  Ingredient.associate = function(models){
    models.Ingredient.belongsToMany(models.Unit, {
      through: models.RecipeIngredients
    });
  };
  return Ingredient;
};
