import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {getAChat,addMessage} from './../flux/actions/chatAction'
import {makeStyles,Button, Box, Input, Avatar, Grid, Paper,Typography} from '@material-ui/core';
import Moment from 'react-moment';

function ChatRoom({getAChat,chat,auth,addMessage}) {
    let messages
    const [chatInput, setChatInput] = useState("")
    if(chat.singleChat)
        messages = chat.singleChat.message


    useEffect(() => {  
    if(chat.chatWith)  
      getAChat(chat.chatWith._id)
            }, [chat.chatWith])


    const inputChangeHandler  = e  => {
        setChatInput(e.target.value);
        }

    return (
        <Box display="flex" flexDirection="column" >
        <Box display="flex" flexDirection="column" width="75%" height="75%" margin="auto">
          {messages ? messages.map((message, i) => (
              console.log(message),
              <Box display="flex"  key={message._id} width="100%"
              justifyContent = {message.postedBy === auth.user._id?"flex-start": "flex-end"}
              style={{'backgroundColor' : message.postedBy === auth.user._id?"green": "white"}}
              >
                  <Typography variant="h5">{message.text}</Typography>
                  <Typography variant="subtitle1"><Moment format="HH:mm">{message.created}</Moment></Typography>
              
              
              </Box>
              

              
          )):null}
        {chat.chatWith? <Box><Input  onChange={inputChangeHandler}/><Button onClick>Enter</Button></Box> :null}
        </Box>
        </Box>
    )
}

const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth,
    chat: state.chat

})

export default connect(mapStateToProps, {getAChat,addMessage})(ChatRoom)
