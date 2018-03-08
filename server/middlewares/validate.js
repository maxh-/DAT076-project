const { validationResult } = require('express-validator/check');

const validate = (req, res, next) => {
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    res.status(400).json({
      success: false,
      code: 400,
      validationErrors: validation.array()
    });
  }else{
    next();
  }
};

module.exports = validate;
