import { io } from './app';

io.on('connection', (socket) => {
  socket.on('username', (data) => {
    io.emit('username', data);
  });

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('typing', (data) => {
    io.emit('typing', data);
  });

  socket.on('logout', (data) => {
    io.emit('logout', data);
  });
  socket.on('disconnect', (data) => {
    console.log('disconnected');
  });
});
