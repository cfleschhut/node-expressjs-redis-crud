var express = require('express');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var redis = require('redis');
if (process.env.REDISTOGO_URL) {
  var rtg = require('url').parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  var client = redis.createClient();
  client.select((process.env.NODE_ENV || 'development').length);
}

var router = express.Router();

router.route("/")
  .get(function(request, response) {
    client.hkeys('cities', function(error, names) {
      if (error) throw error;
      response.json(names);
    });
  })

  .post(parseUrlencoded, function(request, response) {
    var newCity = request.body
    client.hset('cities', newCity.name, newCity.description, function(error) {
      if (error) throw error;
      response.status(201).json(newCity.name);
    });
  });

module.exports = router;
