import openSocket from 'socket.io-client'

// const socket = openSocket('http://localhost:1337');



const socket = openSocket('https://sm-social-media.herokuapp.com');

export default socket