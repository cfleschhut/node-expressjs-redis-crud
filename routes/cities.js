var express = require('express');
var router = express.Router();

router.route("/")
  .get(function(request, response) {
    var cities = ['Lotopia', 'Caspiana', 'Indigo'];
    response.json(cities);
  });

module.exports = router;
