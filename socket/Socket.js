class Socket {
  constructor(io, nameSpace) {
    this.io = io;
    this.nameSpace = this.io.of(nameSpace);
    this.socket = {};
    this.connected = false;
  }

  connect() {
    let promise = new Promise(resolve => {
      this.nameSpace.on('connection', socket => {
        this.socket = socket;
        this.connected = true;
        console.log(
          `Connection has been established for ${this.nameSpace.name.slice(1)}`
        );
        resolve({ connected: this.connected, socketRef: socket });
      });
    });
    return promise;
  }

  listen(connectionName, callback) {
    this.socket.on(connectionName, callback);
  }

  emit() {
    console.log(this.connected);
    this.socket.emit('message', 'This is a message from server');
  }

  getNameSpace() {
    return this.nameSpace;
  }
}

module.exports = Socket;
