import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, Route } from "react-router-dom";
import RootPage from "./../RootPage";
import PropTypes from "prop-types";

const NavbarHome = props => (
  <div>
    <Navbar
      style={{ "backgroundColor": "#1554a7" }}
      collapseOnSelect
      expand="lg"
      fixed="top"
      variant="dark"
    >
      
      <Navbar.Brand>{"  Debuggd"}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="righttext">
          <button
            type="reset"
            className="buttonstylenav btn"
            onClick={props.renderoot}
          >
            Home
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

NavbarHome.propTypes = {
  renderoot: PropTypes.func.isRequired
};

export default NavbarHome;
