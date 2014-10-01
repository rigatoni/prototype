var express = require('express');
var app = express();
var routes = require('./routes');
var path = require('path');
var net = require('net');
var EventEmitter = require('events').EventEmitter;
var clients = [];

var emitter = new EventEmitter();

function handleClient(cli) {
  console.log('client connected');
  client.push(cli);

  client.on('data', function(data) {
    emitter.emit(data.id, data);
  });
}

function sendMessage(server, message) {
  for(var i = 0; i < clients.length; i++) {
    clients[i].write(message);
  }
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

routes(app, express, emitter);

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

var server = net.createServer(handleClient);

serv.listen(1234, function(){
  console.log("Server listening on port 1234");
});
