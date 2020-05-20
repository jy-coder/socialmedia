import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="#deets">Register</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">Login</Nav.Link>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
