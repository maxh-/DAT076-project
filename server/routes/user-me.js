const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET self */
router.get('/', async (req, res, next) => {
  const user = await models.User.findById(req.user.id);
  res.send(user);
});

/* POST change password */
router.post('/changePassword', async (req, res, next) => {
  if(req.body.password === req.body.password2){
    const user = await models.User.findById(req.user.id);
    const isMatch = await models.User.comparePassword(req.body.oldPassword, user.password);

    if(isMatch){
      user.password = req.body.password;
      await user.save();
      res.send("password updated");
    }else{
      res.status(400).send("old password is not correct");
    }

  }else{
    res.status(400).send("passwords dont match");
  }
});

module.exports = router;
