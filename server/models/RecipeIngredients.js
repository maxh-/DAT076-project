module.exports  = (sequelize, DataTypes) => {
  const RecipeIngredients = sequelize.define('RecipeIngredients', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeNumberRecipeId'
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      unique: 'compositeNumberRecipeId'
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
