module.exports  = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(127),
      allowNull: false,
      unique: true
    }
  });

  // associations
  Ingredient.associate = function(models){
    models.Ingredient.belongsToMany(models.Recipe, {
      through: models.RecipeIngredients
    });
  };

  return Ingredient;
};
