module.exports  = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    instruction: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // associations
  Step.associate = function(models){
    models.Step.belongsTo(models.Recipe, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Step;
};
