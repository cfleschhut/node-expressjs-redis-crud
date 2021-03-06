var express = require('express');
var router = express.Router();
var _ = require('lodash');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var blocks = [
  {
    id: 1,
    name: 'Fixed',
    description: 'Fastened securely in position'
  },
  {
    id: 2,
    name: 'Movable',
    description: 'Capable of being moved'
  },
  {
    id: 3,
    name: 'Rotating',
    description: 'Moving in a circle around its center'
  }
];

router.route("/")
  .get(function(request, response) {
    if (request.query.limit >= 0) {
      response.json(Object.keys(blocks).slice(0, request.query.limit));
    } else {
      response.json(blocks);
    }
  })

  .post(parseUrlencoded, function(request, response) {
    var newBlock = request.body;
    if (!newBlock.description.match(/^\s*$/)) {
      blocks.push(newBlock);
      response.status(201).json(newBlock);
    } else {
      response.status(400).json({
        message: "Description can’t be blank"
      });
    }
  });

router.route("/:id")
  .all(function (request, response, next) {
    var block = _.findWhere(blocks, { id: Number(request.params.id) });
    request.block = block;
    next();
  })

  .get(function(request, response) {
    var block = request.block;
    if (!block) {
      response.status(404).json({
        message: "No block found for " + request.params.id
      });
    } else {
      response.json(block);
    }
  })

  .delete(function(request, response) {
    if (request.block) {
      var blockIndex = _.findIndex(blocks, { id: request.block.id });
      delete blocks[blockIndex];
      response.sendStatus(204);
    } else {
      response.sendStatus(404);
    }
  });

module.exports = router;
