var express = require('express');
var app = express();
var path = require('path');
var net = require('net');
var request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index')
});

app.get('/api/process', function(req, res){

  request.get({url: 'http://localhost:1234/pos', qs: {'text': req.query.text}},function (error, response, body) {
    console.log(error)
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }
  });
}):

app.use(function(req, res, next) {
  res.render('index');
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err.status || 500
  });
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
