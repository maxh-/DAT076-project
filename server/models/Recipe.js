module.exports  = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeToComplete: {
      type: DataTypes.INTEGER,
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
    models.Recipe.hasMany(models.Step);
  };
  return Recipe;
};
