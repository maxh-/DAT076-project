module.exports  = (sequelize, DataTypes) => {
  const RecipeTags = sequelize.define('RecipeTags', {});

  // associations
  RecipeTags.associate = function(models){
    models.RecipeTags.belongsTo(models.Recipe, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return RecipeTags;
};
