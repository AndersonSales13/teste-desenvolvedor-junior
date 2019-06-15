var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', /*{ title: 'Express' }*/);
});

router.get('/characters', function(req, res) {
  res.render('characters', /*{ title: 'Express' }*/);
});

router.get('/data', function(req, res) {
  let characters = require('../characters.json');

  res.status(200).json(characters);
});

module.exports = router;
