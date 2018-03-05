module.exports  = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    kind: {
      type:DataTypes.ENUM('up', 'down'),
      allowNull: false
    }
  });

  return Likes;
};
