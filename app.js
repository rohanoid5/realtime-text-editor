// Importing all the modules
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketIO = require('./socket');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// Importing Configs
const config = require('./config/database');

// Importing all the Routes
const users = require('./routers/user');
const collaborators = require('./routers/collaborator');
const documents = require('./routers/document');
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

// App configurations
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Adding all the routes
app.use('/users', users);
app.use('/collaborators', collaborators);
app.use('/documents', documents);
app.use('/auth', auth);

// socketIO(http);
// const Socket = require('./socket/Socket');
// const socket = new Socket(io, 'dock');
// socket.connect().then(res => {
//   if (res.connected) {
//     socket.emit();
//   }
// });

http.listen(8000, function() {
  console.log('listening on http://localhost:8000');
});
