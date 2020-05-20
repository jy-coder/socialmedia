import React from 'react'
import {deleteItem} from '../flux/actions/postActions'
import { connect } from 'react-redux';


export function DeletePost({_id, deleteItem}) {
    return (
        <section className="modal-body">
            <form>
                Confirm Delete?
        <section className="modal-footer">
        <button type="submit" className="btn btn-primary" onClick={()=> {deleteItem(_id)}}>Yes</button>
        </section>
    </form>
        
</section>
    )
}


const mapDispatchToProps = (state) =>({
    posts_data:state.posts_data
  
  })
  
  export default connect(mapDispatchToProps,{deleteItem})(DeletePost)