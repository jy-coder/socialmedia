import React,{useEffect,useState,useRef} from 'react'
import {connect} from 'react-redux'
import {addMessage,getMyChat,getAChat} from './../flux/actions/chatAction'
import {Box, Input, Avatar, Grid, Typography,Divider,makeStyles} from '@material-ui/core';
import './ChatRoom.css'
import dayjs from 'dayjs';


const useStyles = makeStyles({
    root:{
        position:'relative',
        width:'100%', 
        height:'100vh'
    },
    chatSection: {
        position:'relative',
        width: '100%',
        margin: '0 auto',
        top: '50px'
    },
    pad:{
        padding: '10px'
    },
    font:{
        fontSize: '20px'
    },
    noContent:{
        position:'relative',
        height: '100%',
        top: '300px'
    },
    inputSection:{
        position:'relative',
        width: '100%',
        height:'100px'
    }
  });







function ChatRoom({chat,auth,addMessage,getAChat}) {
    // console.log(chat.singleChat)
    const classes = useStyles();
    let messages
    let chatId
    let authId
    const myRef = useRef(null)
  
    const [chatInput, setChatInput] = useState("")
    if(chat.singleChat){
        messages = chat.singleChat.message
        chatId = chat.singleChat._id
        authId = auth.user._id
        // console.log(messages)
    }

    const scrollToRef = (ref) => {
        if(ref.current){
            // console.log(ref.current)
           ref.current.scrollIntoView({ behavior: 'smooth' })
            // console.log(ref.current.offsetTop)
        }
    }    
    const executeScroll = () => {
        scrollToRef(myRef)
    }


    useEffect(() => {  
    if(chat.chatWith) {
      getAChat(chat.chatWith._id)
     
      
 
    }
            }, [getAChat,chat.chatWith,chat.allChats])


    useEffect(() => {  
        const timer = setTimeout(() => {
            executeScroll()
          }, 100);
          return () => clearTimeout(timer);
            
                }, [chat.chatWith,executeScroll])


 

    
    const renderMessages= () =>{
        let msg, date,display
        let lst = []

    if(messages)
      msg = messages.map((message, i) => {
          let comp = ""
        date = dayjs(message.created).format('DD/MM/YYYY')
        if (!lst.includes(date)){
            comp = <Box display="flex" justifyContent="center">{date}</Box>
            lst.push(date)
        }
      
        display = (
            <div key={i}>
                {comp ? comp : null }
                <Box display="flex"  key={message._id}  justifyContent = {message.postedBy === authId?"flex-end": "flex-start"}>
                    <Box p={2} mt={3} style={{'backgroundColor' : message.postedBy === auth.user._id?"green": "white"}} className="message">
                        <Typography variant="h5">{message.text}</Typography>
                        <Typography variant="subtitle1">{dayjs(message.created).format('HH:mm:ss')}</Typography>
                    </Box>
                </Box>
            </div>
          )
        
          
          return display
         }
        
  
        )
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
            return(
            <Grid container  className={classes.root} >
            <Box className={classes.chatSection} >
                <Grid container item xs={12} className={classes.pad}>
                    <Grid item xs={2}><Avatar/></Grid>
                    <Grid item xs={10}><Typography variant="h6">{chat.chatWith.name}</Typography></Grid>
                </Grid>
                <Divider/>
                <Grid container item xs={12} direction="column" >
                    {renderMessages()}
                </Grid>
            
            
        

                <div ref={myRef}/>
            
            </Box>
            
            
            <Grid  className={classes.inputSection} >
                <Box id="input-box" mt={5}>
                    <form className= "chatroom-form" onSubmit={(e) => handleClick(e)}>
                        <Input placeholder="Enter text" onChange={inputChangeHandler}  className={classes.font}/>
                    </form>
                    </Box> 
            </Grid>
            
            </Grid>)
            
        else
            return <Box display="flex" className={classes.noContent} alignContent="center" justifyContent="center">Click user to see message</Box>
        
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

export default connect(mapStateToProps, {addMessage,getMyChat,getAChat})(ChatRoom)
