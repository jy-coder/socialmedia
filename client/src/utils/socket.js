// var socket = require('socket.io-client')('http://localhost:1337');

var socket = require('socket.io-client')('https://sm-social-media.herokuapp.com/socket.io/?EIO=4&transport=websocket');

// const socket = openSocket('https://sm-social-media.herokuapp.com');

export default socket