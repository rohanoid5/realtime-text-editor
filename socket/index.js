module.exports = function(http) {
  const io = require('socket.io')(http),
    documents = io.of('/dock'),
    userList = [],
    connections = [];

  documents.on('connection', function(socket) {
    console.log(`Document sockets connected.`);
    socket.emit('message', 'This is a message from server');
    socket.on('server message', msg => {
      console.log(msg);
    });
  });

  // documents.emit('message', 'This is a message from server');

  io.on('connection', function(socket) {
    connections.push(socket);
    console.log(`Connected: ${connections.length} sockets connected.`);

    // Disconnected
    socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
      userList.splice(userList.indexOf(socket.username), 1);
      console.log(`Disconnected: ${connections.length} sockets connected`);
    });

    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });

    socket.on('add user', user => {
      socket.user = user;
      userList.push(socket.user);
      updateUsersList();
      console.log(userList);
    });

    socket.on('subscribeToTimer', interval => {
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        socket.emit('timer', new Date());
      }, interval);
    });

    const updateUsersList = () => io.sockets.emit('get users', userList);
  });
};
