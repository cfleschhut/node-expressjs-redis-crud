var express = require('express');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var redis = require('redis');
if (process.env.REDISTOGO_URL) {
  var client = redis.createClient(process.env.REDIS_URL);
} else {
  var client = redis.createClient();
  client.select((process.env.NODE_ENV || 'development').length);
}

var router = express.Router();

router.route('/')
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

router.route('/:name')
  .get(function(request, response) {
    client.hget('cities', request.params.name, function(error, description) {
      response.json({
        city: {
          name: request.params.name,
          description: description
        }
      })
    });
  });

module.exports = router;
