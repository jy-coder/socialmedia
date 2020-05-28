import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import { getChat, addChat,socket_addChat } from '../flux/actions/postActions'
import './Chat.css'
import Moment from 'react-moment';
import openSocket from 'socket.io-client'

function ChatRoom({auth, posts_data,getChat,addChat,socket_addChat}) {
    let chatHistory = []

    const [chatInput, setChatInput] = useState("")
    let chatId = posts_data.chatId
    let authId = auth.user._id

 
    useEffect(() =>{
        getChat(posts_data.chatWithId)
        const socket = openSocket('http://localhost:1337');
         socket.on('chat', data => {
        if (data.action === 'add') {
            console.log(data.chat)
            socket_addChat(data.chat.chat)
      }

    })},[posts_data.chatWithId,addChat])


    const inputChangeHandler  = e  => {
        setChatInput(e.target.value);
      }
    
    
    if(auth.user){
        chatHistory = posts_data.chat
    
    }


    const chatMessage = () => {
        if(chatHistory){
            const content = chatHistory.map((chat, i ) => (
            <div  className={ chat.postedBy && chat.postedBy._id === auth.user._id? "chat-one-message--left": "chat-one-message--right"}>
            <span>{chat.text}</span>
            <small className="text-muted"><Moment format="HH:mm">{chat.postedBy ?chat.postedBy.created : null }</Moment></small>
            </div>
    
    
            
            ))
    
            return content
        }
        else
            return null
    }


    return (
    <div className ="chatroom-input-follow-wrapper">
    <div className="follow-chatroom">
        {chatMessage()}
    </div>
    <div className="chatroom-input">
        <div><input type="text" class="form-control" onChange={inputChangeHandler}/></div><button onClick={() => addChat(chatId,authId,chatInput)}>Enter</button>
    </div>
    </div>
    )
    }



const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth

})

export default connect(mapStateToProps, {getChat,addChat,socket_addChat})(ChatRoom)
