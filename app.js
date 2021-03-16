const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log("socket.io server listening on port 3000");
});

io.on('connection', (socket) => {
  socket.on('login', (data) => {
    console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);

    socket.name = data.name;
    socket.userid = data.userid;

    io.emit('login', data.name);
  });

  socket.on('chat', (data) => {
    console.log("Message from %s %s", socket.name, data.msg);

    const msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    socket.broadcast.emit('chat', msg);
  });

  socket.on('forceDisconnect', () => {
    socket.disconnect();
  });

  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.name);
  });

});