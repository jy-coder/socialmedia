import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {getMyChat, setChatWith,addMessage,newMessageOtherUser } from './../flux/actions/chatAction'
import ChatRoom from './ChatRoom'
import './Chat.css'
import socket from './../utils/socket'
import {makeStyles,Button, Box, Input, Avatar, Grid, Paper} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    chatbox: {
      cursor: "pointer"
    },
    paper: {
      width:'50%',
      height:'100%'

    },
    chatroom: {
        width:'100%',
        height:'100%'
  
      }
}));



function Chat({auth, chat,getMyChat,setChatWith,newMessageOtherUser }) {
    const classes = useStyles();
   const chats = chat.allChats
   
   

//  console.log(chat.allChats)

    useEffect(() => {    
        getMyChat()
            }, [getMyChat])


    useEffect(() => {
        chats.forEach(async (chat) => { 
            // console.log(chat)
                socket.on(chat._id,data =>{
                    if(data.action === "newmessage")
                        newMessageOtherUser(chat._id,data.chat.message)
            })
        })
        },[chat.allChats])

        


    return (
    <Grid container direction="row" style={{height:'100%'}}>
    <Paper className={classes.paper}>
    <Grid>
        
           {chats.map((chat, i) => {
              
              let lastMsg
               let user = chat.user.filter(c => c._id !== auth.user._id)
               if(chat.message)
                 lastMsg = chat.message[chat.message.length -1]
            


            return(
           
                <Grid key={chat._id} container item xs={12} style={{height:"1%"}}>
                    <Grid container spacing={3}>
                        <Grid item><Avatar style={{marginLeft:'10px'}}/></Grid>
                        <Grid item xs={8} container className={classes.chatbox} onClick={()=>setChatWith(user[0])}>
                            <Grid item xs={12}>{user[0].name}</Grid>
                            <Grid item xs={12}>{lastMsg ? lastMsg.text: null}</Grid>
                        </Grid>

                    </Grid>
            </Grid>
     

            )})}
  

        
    </Grid>
    </Paper>
    <Paper className={classes.paper} >
    <Grid className={classes.chatroom}  >   
        <ChatRoom/>
    </Grid>
    </Paper>
</Grid>
    )



 }


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth,
    chat: state.chat

})

export default connect(mapStateToProps, {getMyChat,setChatWith,addMessage,newMessageOtherUser })(Chat)



{/* <small className="text-muted">{chat.postedBy === auth.user ? "Me" : chat.postedBy.created}</small> */}