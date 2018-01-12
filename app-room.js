app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index-room.html');
});

var chat = io.of('/chat').on('connection', function (socket) {
  socket.on('chat message', function (data) {
    console.log('message from client: ', data);

    var name = socket.name = data.name;
    var room = socket.room = data.room;

    socket.join(room);
    chat.to(room).emit('chat message: ', data.msg);
  });
});

server.listen(3000, function () {
  console.log("Socket IO Server listening on port 3000");
});