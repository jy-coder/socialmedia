import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import { getChat, addChat, setOpenChat, chatWith } from '../flux/actions/postActions'
import ChatRoom from './ChatRoom'
import './Chat.css'
import Moment from 'react-moment';
import openSocket from 'socket.io-client'



function Chat({auth, posts_data,getChat, addChat,setOpenChat,chatWith}) {
    // console.log(auth)

    // const [chatInput, setChatInput] = useState("")
    // let chatId = posts_data.chatId
    // let authId = auth.user._id


    // const inputChangeHandler  = e  => {
    //     setChatInput(e.target.value);
    //   }
      

    let listOfFollowing = []
    let listOfFollowers = []
    // let chatHistory = []

    if(auth.user){
        listOfFollowing = auth.user.following
        listOfFollowers = auth.user.followers
        // chatHistory = posts_data.chat

    }



    useEffect(() => {    
        // if(auth.isAuthenticated)
        //     getChat()
            }, [setOpenChat])
    


    // console.log(listOfFollowing)

    // const chatMessage = () => {
    //     if(chatHistory){
    //         const content = chatHistory.map((chat, i ) => (
    //         <div  className={chat.postedBy._id === auth.user._id? "chat-one-message--left": "chat-one-message--right"}>
    //         <span>{chat.text}</span>
    //         <small className="text-muted"><Moment format="HH:mm">{chat.postedBy.created}</Moment></small>
    //         </div>


            
    //         ))

    //         return content
    //     }
    //     else
    //         return null
    // }


    return (
        <div className="chat-app">
            <div className="follow-chat-wrapper">
            {posts_data.openChat ? <ChatRoom/>: null}
            
            <div className="list-follow">
            <ul class="list-group">
            {listOfFollowing ? listOfFollowing.map((follower, i)=> <li className="list-group-item"><img src = {'/' + follower.photo} /> <span onClick={() => {chatWith(follower._id); setOpenChat()}}> {follower.name} </span></li> ) : null}
            Chat
            </ul>
            </div>
            </div>

        </div>
    )
}




const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth

})

export default connect(mapStateToProps, {getChat,addChat,setOpenChat,chatWith})(Chat)



{/* <small className="text-muted">{chat.postedBy === auth.user ? "Me" : chat.postedBy.created}</small> */}