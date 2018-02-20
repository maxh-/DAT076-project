module.exports  = (sequelize, DataTypes) => {
  const RecipeIngredients = sequelize.define('RecipeIngredients', {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  // associations
  RecipeIngredients.associate = function(models){
    models.RecipeIngredients.belongsTo(models.Recipe, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return RecipeIngredients;
};
