import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.css";
import logo from "../../assets/navbar/logo.svg";
import { FaUser } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { IoGiftSharp } from "react-icons/io5";

function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navBg py-3" position-fixed>
      <Container fluid className="navBg">
        <Navbar.Brand href="/" className="brandName">
          <img src={logo} alt="logo"  className="pb-1 me-2"/>
          TaskOn
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" className="navtop">
          <Nav className="center">
            <Nav.Link href="#features" className="text-white ms-3 navTitle">
              Campaign
            </Nav.Link>
            <Nav.Link href="#pricing" className="text-white ms-3 navTitle">
              Event
            </Nav.Link>
            <Nav.Link href="#pricing" className="text-white ms-3 navTitle">
              Space
            </Nav.Link>

            <NavDropdown
              title="Create"
              id="collapsible-nav-dropdown"
              className="navTitles ms-3"
            >
              <NavDropdown.Item href="#action/3.1" className="bg-dark ">
                <div className="d-flex text-white">
                  <div>
                    <FaUser size={25} className="mt-3 me-3" />
                  </div>
                  <div>
                    <h6 className="navHeading">Space</h6>
                    <p className="navText">
                      Showcase your project, campaigns, events and engage users
                    </p>
                  </div>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/camp" className="bg-dark">
                <div className="d-flex text-white">
                  <div>
                    <FaGlobe size={25} className="mt-3 me-3" />
                  </div>
                  <div>
                    <h6 className="navHeading">Campaign</h6>
                    <p className="navText">
                      Promote projects and grow your base
                    </p>
                  </div>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="bg-dark">
                <div className="d-flex text-white">
                  <div>
                    <FaNoteSticky size={25} className="mt-3 me-3" />
                  </div>
                  <div>
                    <h6 className="navHeading">Event</h6>
                    <p className="navText">
                      Aggregate multiple campaigns and expose to a wider range
                      of users
                    </p>
                  </div>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" className="bg-dark">
                <div className="d-flex text-white">
                  <div>
                    <IoGiftSharp size={25} className="mt-3 me-3" />
                  </div>
                  <div>
                    <h6 className="navHeading">Referral</h6>
                    <p className="navText">Ask users to refer your campaigns</p>
                  </div>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="">
            <Nav.Link>
              <button className="Btn"></button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;