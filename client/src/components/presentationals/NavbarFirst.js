import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

const NavbarFirst = () => (
  <Navbar style={{ "backgroundColor": "#1554a7" }} variant="dark" fixed="top">    
    <Navbar.Brand>{"  Debuggd"}</Navbar.Brand>
    <a style={{ "color": "#fff" }} href="/pendingapprovals">Onboard</a>
  </Navbar>
);

export default NavbarFirst;
