const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index-room.html');
});

const chat = io.of('/chat').on('connection', (socket) => {
  socket.on('chat message', (data) => {
    console.log('message from client: ', data);

    const name = socket.name = data.name;
    const room = socket.room = data.room;

    socket.join(room);
    chat.to(room).emit('chat message: ', data.msg);
  });
});

server.listen(3001, () => {
  console.log("Socket IO Server listening on port 3001");
});