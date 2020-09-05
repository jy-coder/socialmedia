let io;
let socket;

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer);
     socket = io({
      transports: ['websocket']
    });

    return socket;
  },
  getIO: () => {
    if (!socket) {
      throw new Error('Socket.io not initialized!');
    }
    return socket;
  }
};
