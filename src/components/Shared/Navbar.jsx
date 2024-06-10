import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar
      bg="primary"
      expand="lg"
      fixed="top"
      className="px-5 text-light"
    >
      <Link to="/" className="navbar-brand text-light">
        PMS
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Link to="/patients" className="nav-link text-light">
            Patients
          </Link>
          <Link to="/wards" className="nav-link text-light">
            Wards
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
