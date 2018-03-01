const models = require('../models');

exports.getAllTags = async () => {
  const tags = await models.Tag.findAll({
    attributes: ['id', 'tag']
  });
  return {
    success: true,
    code: 200,
    tags: tags
  };
};

exports.getTagById = async (id) => {
  const tag = await models.Tag.findById(id, {
    attributes: ['id', 'tag']
  });
  if(tag === null){
    return {
      success: false,
      code: 404,
      tags: "tag could not be found"
    };
  }
  return {
    success: true,
    code: 200,
    tags: tag
  };
};
