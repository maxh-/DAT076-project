module.exports  = (sequelize, DataTypes) => {
  const Unit = sequelize.define('Unit', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    abbreviation: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true
    }
  });

  // associations
  Unit.associate = function(models){
    models.Unit.belongsToMany(models.Ingredient, {
      through: models.RecipeIngredients
    });
  };
  return Unit;
};
