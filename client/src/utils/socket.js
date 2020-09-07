const URL = 'http://localhost:1337'


let io;

module.exports = {
    init: () => {
      io = require('socket.io-client')(URL,{transports: ['websocket']});
      return io;
    }
  };

