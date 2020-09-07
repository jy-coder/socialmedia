

// const URL = 'http://localhost:1337'
const URL = 'https://sm-social-media.herokuapp.com'
let io;

module.exports = {
    init: () => {
      io = require('socket.io-client')(URL,{transports: ['websocket']});
      return io;
    }
  };

