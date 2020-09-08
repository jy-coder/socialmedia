# MERN Social Media
> * Social media app built with MERN stack along with Redux for state management, Material UI and socketIO with MongoDB. Page is real-time only after authentication.
> * Allow user to communicate real-time over websocket connection (chat & comment), with basic functionality such as creating, liking and commenting on a post, following, browsing a user’s profile and chatting with friends

## Heroku deployment
>https://sm-social-media.herokuapp.com/ <br/>
>*There are multuple users for testing websockets. As stated below are the username and password for logging in:* <br/>
> username: test <br/>
> password:  test <br/>
> username: test2 <br/>
> password:  test2<br/>
> username: test3 <br/>
> password:  test3 




## Local deployment configuration
> * config_example.txt contains variables for server configuration. Rename to **config.env** after configuration.*

## Quick start

Run the express server only
>cd server<br/>
npm install<br/>
npm run start:prod<br/>


Run the client server only
>cd client<br/>
npm install<br/>
npm run start<br/>

Server runs on http://localhost:1337 and client on http://localhost:3000
