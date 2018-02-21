module.exports  = (sequelize, DataTypes) => {
  const RecipeTags = sequelize.define('RecipeTags', {});

  return RecipeTags;
};
