var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var cities = {
  'Lotopia': 'description 1',
  'Caspiana': 'description 2',
  'Indigo': 'description 3'
};

router.route("/")
  .get(function(request, response) {
    response.json(Object.keys(cities));
  })

  .post(parseUrlencoded, function(request, response) {
    var newCity = request.body
    cities[newCity.name] = newCity.description
    response.status(201).json(newCity.name);
  });

module.exports = router;
