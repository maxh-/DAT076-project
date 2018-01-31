var express = require('express');
var router = express.Router();

/* GET welcome page strings. */
router.get('/', function(req, res, next) {
  res.json({
    title: "Hejsan!",
    body: "Detta ska bli en webapp."
  });
});

module.exports = router;
