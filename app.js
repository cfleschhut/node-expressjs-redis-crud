var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3001));

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

module.exports = app;
