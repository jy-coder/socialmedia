const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean'); 
const postRoute = require('./routes/postRoute')
const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoute')
const globalErrorHandler = require('./controllers/errorController')
const cookieParser = require('cookie-parser');
const path = require('path');



process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION!@ SHUTTING DOWN...');
  process.exit(1);
});



// dotenv.config({ path: './config.env' });

const app = express();


app.use(morgan('dev'));
app.use(helmet());
app.use(cors({origin: '*'}))
app.use(express.json({ limit: '10kb' }))
app.use(mongoSanitize());
app.use(xss());
app.use(cookieParser());

// SETTING UP DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);



const port = process.env.PORT || 1337;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(()=> {
    const server = app.listen(port);
    const io = require('./utils/socket').init(server);
    io.on('connection', (socket) => {
      console.log('Client connected');
      socket.on('disconnect', () => console.log('Client disconnected'));
      socket.on('reconnect', () => console.log('Client reconnect'));


    });
  
  })
  .catch(err => console.log(err));
process.on('unhandledRejection', err => {
  console.log('UNHANDLER REJECTION!@ SHUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
})



app.use('/api/post', postRoute)
app.use('/api/user', userRoute)
app.use('/api/chat', chatRoute)



if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


//HANDLING ERROR

app.use(globalErrorHandler)

