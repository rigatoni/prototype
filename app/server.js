var net = require('net');

var clients = [];

function handleClient(cli) {
  console.log('client connected');
  client.push(cli);
}

function connect() {
  var server = net.createServer(handleClient);

  serv.listen(1234, function(){
    console.log("Server listening on port 1234");
  });
  return server;
}

function sendMessage(server, message) {
  for(var i = 0; i < clients.length; i++) {
    clients[i].write(message);
  }
}

module.exports = {
  connect: connect,
  sendMessage: sendMessage
};
