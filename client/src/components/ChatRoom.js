import React,{useEffect,useState,useRef} from 'react'
import {connect} from 'react-redux'
import {addMessage, setChatWith,getMyChat} from './../flux/actions/chatAction'
import {makeStyles,Button, Box, Input, Avatar, Grid, Paper,Typography,Divider} from '@material-ui/core';
import Moment from 'react-moment';
import './ChatRoom.css'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';







function ChatRoom({chat,auth,addMessage,getMyChat}) {
    console.log(chat.singleChat)
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
            // console.log(ref.current.offsetTop)
        }
    }    
    const executeScroll = () => {
        scrollToRef(myRef)
    }


    useEffect(() => {  
    if(chat.chatWith) {
      getMyChat(chat.chatWith._id)
     
      
 
    }
            }, [])


    useEffect(() => {  
        const timer = setTimeout(() => {
            executeScroll()
          }, 100);
          return () => clearTimeout(timer);
            
                }, [])

    
    const renderMessages= () =>{
        let msg;
    if(messages)
      msg = messages.map((message, i) => (
              <Box display="flex"  key={message._id}  justifyContent = {message.postedBy === authId?"flex-end": "flex-start"}>
                  <Box p={2} mt={3} style={{'backgroundColor' : message.postedBy === auth.user._id?"green": "white"}} className="message">
                      <Typography variant="h5">{message.text}</Typography>
                    <Typography variant="subtitle1">{dayjs(message.createdAt).format('HH:mm:ss')}</Typography>
                </Box>
            </Box>
  
        ))
        return msg
    }

    
         


    const inputChangeHandler  = e  => {
        setChatInput(e.target.value);
        }

    const handleClick =  e =>{
        e.preventDefault()
        e.target.reset();
        addMessage(chatId,authId,chatInput)
    }

    const renderMessagesDiv = () =>{
        if(chat.chatWith)
            return(<Grid container  style={{position:'relative',width:'100%', height:'100vh'}} >
            <Box className="chat-section" style={{border:'2px green solid', position:'relative'}} >
                <Grid container item xs={12} style={{padding:'10px'}}>
                    <Grid item xs={2}><Avatar/></Grid>
                    <Grid item xs={10}><Typography variant="h6">{chat.chatWith.name}</Typography></Grid>
                </Grid>
                <Divider/>
                <Grid container item xs={12} direction="column" >
                    {renderMessages()}
                </Grid>
            
            
        

                <div ref={myRef}/>
            
            </Box>
            
            
            <Grid  className="input-section" style={{position:'relative',width:'100%', border:'2px purple solid',display:'flex'}}>
                <Box id="input-box" mt={5}>
                    <form className= "chatroom-form" onSubmit={(e) => handleClick(e)}>
                        <Input placeholder="Enter text" onChange={inputChangeHandler}  style = {{fontSize: 20}}/>
                    </form>
                    </Box> 
            </Grid>
            
            </Grid>)
            
        else
            return <Box display="flex" style={{position:'relative', height:'100%'}} alignContent="center" justifyContent="center">Click user to see message</Box>
        
    }



    return (
       
        renderMessagesDiv()
       
    )
}

const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth,
    chat: state.chat

})

export default connect(mapStateToProps, {addMessage,getMyChat})(ChatRoom)
