import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
function NavBar({auth}) {
    return (
        <Navbar>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle />
        {!auth.isAuthenticated ?
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
        </Navbar.Collapse>
        : 
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="/wall">My Wall</Nav.Link>
        <Nav.Link href="/profile">Change profile picture</Nav.Link>
        </Navbar.Collapse>}

        
        </Navbar>
    )
}


const mapStateToProps = (state) =>({
    posts_data:state.posts_data,
    error_data: state.error_data,
    auth: state.auth
  
  })

export default connect(mapStateToProps)(NavBar);
