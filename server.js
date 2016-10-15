const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// http://localhost:3000/internal/v1/
// will get html from folder /public
//app.use('/internal/v1', express.static(__dirname + '/public'));
//app.use('/', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('sendMessage', function (data) {
    io.sockets.emit('response', {"id": socket.id, "message": data});
  });

});
