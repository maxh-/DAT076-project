const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET all users */
router.get('/all', async (req, res, next) => {
  const users = await models.User.findAll({
    attributes: ['id', 'firstName', 'lastName']});
  res.send(users);
});

/* GET a user by id. */
router.get('/:id', async (req, res, next) => {
  const user = await models.User.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'firstName', 'lastName']});
  res.send(user);
});

module.exports = router;
