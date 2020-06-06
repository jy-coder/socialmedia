import React,{useEffect,useState,useRef} from 'react'
import {connect} from 'react-redux'
import {getAChat,addMessage, setChatWith} from './../flux/actions/chatAction'
import {makeStyles,Button, Box, Input, Avatar, Grid, Paper,Typography} from '@material-ui/core';
import Moment from 'react-moment';
import './ChatRoom.css'






function ChatRoom({getAChat,chat,auth,addMessage}) {
    let messages
    let chatId
    let authId
    const myRef = useRef(null)
  
    const [chatInput, setChatInput] = useState("")
    if(chat.singleChat){
        messages = chat.singleChat.message
        chatId = chat.singleChat._id
        authId = auth.user._id
    }

    const scrollToRef = (ref) => {
        if(ref.current){
           ref.current.scrollIntoView({ behavior: 'smooth' })
            console.log(ref.current.offsetTop)
        }
    }    
    const executeScroll = () => {
        scrollToRef(myRef)
    }


    useEffect(() => {  
    if(chat.chatWith) {
      getAChat(chat.chatWith._id)
     
      
 
    }
            }, [chat.chatWith,chat.allChats])


    useEffect(() => {  
        const timer = setTimeout(() => {
            executeScroll()
          }, 100);
          return () => clearTimeout(timer);
            
                }, [chat.chatWith,chat.allChats])

           
         


    const inputChangeHandler  = e  => {
        setChatInput(e.target.value);
        }

    const handleClick =  e =>{
        e.preventDefault()
        e.target.reset();
        addMessage(chatId,authId,chatInput)
    }

    return (
        
        <Box display="flex" flexDirection="column" className="chat-input-wrapper">
        
        <Box className="chat-section" >
       
          {messages ? messages.map((message, i) => (
            //   console.log(message),
              <Box display="flex"  key={message._id} 
              justifyContent = {message.postedBy === authId?"flex-start": "flex-end"}>
                  <Box p={2} mt={3} style={{'backgroundColor' : message.postedBy === auth.user._id?"green": "white"}} className="message"><Typography variant="h5">{message.text}</Typography>
                <Typography variant="subtitle1"><Moment format="HH:mm">{message.created}</Moment></Typography>
             
        
                </Box>
                
              
           
            
            <div ref={myRef}/>
            </Box>
              

              
          )):"Click to see message"}
        
   
        </Box>
        
        
        <div className="input-section">
            {chat.chatWith? <Box id="input-box" mt={5}><form className= "chatroom-form" onSubmit={(e) => handleClick(e)}><Input onChange={inputChangeHandler}  style = {{fontSize: 20}}/><Button type="submit">Enter</Button></form></Box> :null}
        </div>
        
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
