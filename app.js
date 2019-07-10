// Importing all the modules
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// Importing Configs
const config = require('./config/database');

// Importing all the Routes
const users = require('./routers/user');
const collaborators = require('./routers/collaborator');
const auth = require('./routers/auth');

//Import the mongoose module
const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useCreateIndex: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

const userList = [];
const connections = [];

// App configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(cors);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Adding all the routes
app.use('/users', users);
app.use('/collaborators', collaborators);
app.use('/auth', auth);

io.on('connection', function(socket) {
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected.`);

  // Disconnected
  socket.on('disconnect', data => {
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

http.listen(8000, function() {
  console.log('listening on http://localhost:8000');
});
