
// var socket = require('socket.io-client')('https://sm-social-media.herokuapp.com/socket.io/?EIO=4&transport=websocket');


// const URL = 'http://localhost:1337'
const URL = 'https://sm-social-media.herokuapp.com/socket.io/?EIO=4&transport=websocket'
let io;

module.exports = {
    init: () => {
      io = require('socket.io-client')(URL,{transports: ['websocket']});
      return io;
    }
  };

