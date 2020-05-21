import React,{useEffect} from 'react'
import {getuserInfo} from '../flux/actions/postActions'
import {connect} from 'react-redux'
export function UserInfo({getuserInfo, posts_data,match}) {

    // console.log(posts_data)

    useEffect(() => {
        getuserInfo(match.params.id)
       
      }, [getuserInfo])

    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data
  
  })
  
  export default connect(mapStateToProps,{getuserInfo})(UserInfo)
