import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');
// const socket = openSocket('http://192.168.2.29:8000/');

const subscribeToTimer = cb => {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
};

export { subscribeToTimer, socket };
