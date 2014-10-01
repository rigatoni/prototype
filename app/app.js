var express = require('express');
var app = express();
var path = require('path');
var net = require('net');
var uuid = require('uuid');
var EventEmitter = require('events').EventEmitter;

var clients = [];
var emitter = new EventEmitter();

function handleClient(cli) {
  console.log('client connected');
  clients.push(cli);

  cli.on('data', function(data) {
    var msg = JSON.parse(data.toString());
    emitter.emit(msg.id, msg);
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

app.get('/', function(req, res) {
  res.render('index')
});

app.get('/api/process', function(req, res){

  if(clients.length > 0) {
    var id = uuid.v4()
    var message = {
      id: id,
      text: req.query.text
    }
    emitter.once(id, function(data){
      res.json(data);
    });
    var str = JSON.stringify(message)
    var bytes = Buffer.byteLength(str, 'utf8');
    clients[0].write(bytes + '\n' + str);
  } else {
    res.status(404).json({message: "No clients connected"});
  }
});

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

var tcpServer = net.createServer(handleClient);

tcpServer.listen(1234, function(){
  console.log("Server listening on port 1234");
});
