const models = require('../models');

exports.getAllUnits = async (id) => {
  const units = await models.Unit.findAll({attributes: ['id','name', 'abbreviation']});
  return {
    success: true,
    code: 200,
    recipe: units
  };
};

exports.getUnitById = async (id) =>{
  const unit = await models.Unit.findById(id,{attributes: ['id','name', 'abbreviation']});
  if(unit){
    return {
      success: true,
      code: 200,
      user: unit
    };
  } else {
    return {
      success: false,
      code: 404,
      message: "unit does not exist"
    };
  }

};
