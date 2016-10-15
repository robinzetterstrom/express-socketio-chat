const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

server.listen(3000, () => {
  console.log('Chat application listening on localhost:3000!');
});

app.use('/assets', express.static('public/assets/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  // Client connected to server
  console.log(`Client: ${socket.id} connected.`);

  // Client disconnects from server
  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected');
  });

  // Listening for chat messages and emit the message back to all connected clients.
  socket.on('sendMessage', data => {
    io.sockets.emit('response', {"id": socket.id, "message": data});
  });
  // Emit socket/connection count.
  io.sockets.emit('clients', io.eio.clientsCount)

});
