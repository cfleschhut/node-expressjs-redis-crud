var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

app.listen(3001, function() {
  console.log('listening on port 3001');
});
