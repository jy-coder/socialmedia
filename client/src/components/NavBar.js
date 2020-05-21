import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
