const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET users. */
router.get('/', (req, res, next) => {
  console.log("serving users");
  models.User.findAll().then(users => {
    res.send(users);
  });
});

router.get('/createTestUser/:id', (req, res, next) => {
  console.log("creating test user");
  models.User.create({
    username: req.params.id,
    password: "testpass"
  }).then(user => {
    res.send(user);
  });
});

module.exports = router;
