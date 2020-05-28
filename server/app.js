const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const postRoute = require('./routes/postRoute')
const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoute')
// const likeRoute = require('./routes/likeRoute')
const globalErrorHandler = require('./controllers/errorController')
const cookieParser = require('cookie-parser');



global.__basedir = __dirname;


process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION!@ SHUTTING DOWN...');
  process.exit(1);
});



dotenv.config({ path: './config.env' });

const app = express();


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
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })
  .catch(err => console.log(err));
process.on('unhandledRejection', err => {
  console.log(err);
  console.log('UNHANDLER REJECTION!@ SHUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
})


app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
    withCredentials: true

    
}))

app.use(express.json())
app.use(cookieParser());
app.use('/api/post', postRoute)
app.use('/api/user', userRoute)
app.use('/api/chat', chatRoute)




//HANDLING ERROR

app.use(globalErrorHandler)



// app.listen(port, 'localhost',() =>{
//     console.log(`App running on port ${port}`);

// })
