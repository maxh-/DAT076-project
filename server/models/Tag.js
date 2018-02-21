module.exports  = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tag: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    }
  });

  // associations
  Tag.associate = function(models){
    models.Tag.belongsToMany(models.Recipe, {
      through: models.RecipeTags
      });
  };
  return Tag;
};
