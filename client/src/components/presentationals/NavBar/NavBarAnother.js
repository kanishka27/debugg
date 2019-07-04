import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { authContext } from "../../../config/adalConfig";

const logOut = () => {
  authContext.logOut();
};

const NavBarAnother = () => (
  <div>
    <Navbar
      style={{ backgroundColor: "#1554a7" }}
      collapseOnSelect
      expand="lg"
      fixed="top"
      variant="dark"
    >
      <Navbar.Brand>{"  Debuggd"}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end">
          <Link to="/" style={{ color: "#fff" }}>
            Home
          </Link>
          <span onClick={logOut} data-test="logOut" className="logOut">
            Logout
          </span>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default NavBarAnother;
