module.exports  = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    timeToComplete: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tweet: {
      type: DataTypes.STRING(140),
      allowNull: false
    }
  });

  // associations
  Recipe.associate = function(models){
    models.Recipe.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Recipe.belongsToMany(models.Tag, {
      through: models.RecipeTags
    });
    models.Recipe.hasMany(models.Step);
    models.Recipe.belongsToMany(models.Ingredient, {
      through: models.RecipeIngredients
    });
    models.Recipe.hasMany(models.RecipeIngredients);
    models.Recipe.belongsToMany(models.User, {
      through: 'Likes',
      as: 'likes',
      foreignKey: 'recipeId'
    });
    models.Recipe.belongsToMany(models.User, {
      through: 'Favorites',
      as: 'favorites',
      foreignKey: 'recipeId'
    });
  };
  return Recipe;
};
