import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import './Chat.css'

function Chat({auth}) {
    // console.log(auth)

    let listOfFollowing = []
    let listOfFollowers = []

    if(auth.user){
        listOfFollowing = auth.user.following
        listOfFollowers = auth.user.followers
    }


    useEffect(() => {     
            }, [])
    
    

    // console.log(listOfFollowing)

    return (
        <div className="chat-app">
            <div className="follow-chat-wrapper">
            <div className="follow-chatroom">
                SIDE
                <div className="chatroom-input">
                    <div><input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"/></div>
                    <div class="chatroom-input-btn input-group-append">
                        <span class="input-group-text pl-1  ">Enter</span>
                    </div>
                </div>
           
            </div>
            
            <div className="list-follow">
            <ul class="list-group">
            {listOfFollowing ? listOfFollowing.map((follower, i)=> <li className="list-group-item"><img src = {'/' + follower.photo} /> < > {follower.name} </></li> ) : null}
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

export default connect(mapStateToProps, {})(Chat)
