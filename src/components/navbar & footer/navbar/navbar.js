import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.css";
import logo from "../../assets/navbar/wetask - logo.png";
import { FaUser } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { IoGiftSharp } from "react-icons/io5";
import { SiLevelsdotfyi } from "react-icons/si";
import { TbEaseInOutControlPoints } from "react-icons/tb";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserView, Deposit} from "../../../services/blockchain";

function MyNavbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data, isConnected } = UserView();
  const [amount, setAmount] = useState("");
  // console.log(balance);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  console.log(data);

  return (
    <Navbar collapseOnSelect expand="lg" className="navBg py-3" sticky="top">
      <Container fluid className="navBg">
        <Navbar.Brand href="/" className="brandName">
          <img src={logo} alt="logo" width={30} className="pb-1 me-2" />
          WeTask
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" className="navtop">
          <Nav className="center">
            <Nav.Link href="/campaign" className="text-white ms-3 navTitle">
              Campaign
            </Nav.Link>
            <Nav.Link href="/event" className="text-white ms-3 navTitle">
              Event
            </Nav.Link>
            <Nav.Link href="/space" className="text-white ms-3 navTitle">
              Space
            </Nav.Link>

            <NavDropdown
              title="Create"
              id="collapsible-nav-dropdown"
              className=" ms-3 d-none d-sm-block userDropDown"
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
              <NavDropdown.Item href="/camp/basicinfo" className="bg-dark">
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
          <TwitterAuth twitterConnected={twitterConnected} setTwitterConnected={setTwitterConnected} />
          <Nav className="">
            <Nav.Link className="d-lg-flex">
              {isConnected && userData ? (
                <NavDropdown
                  title={<FaUser size={20} className="me-2" />}
                  id="collapsible-nav-dropdown"
                  className=" me-3 userDropDown"
                >
                  <NavDropdown.Item
                    href="#action/3.1"
                    className="bg-dark text-white"
                  >
                    <div className="d-flex">
                      <div>
                        <SiLevelsdotfyi size={20} className="me-3" />
                      </div>
                      {data.level && (
                        <div className="d-flex mt-1">
                          <h6 className="navHeading me-2">Assets </h6>
                          <h6>{data.assets}</h6>
                        </div>
                      )}
                    </div>

                    <div className="d-flex mt-4">
                      <div>
                        <SiLevelsdotfyi size={20} className="me-3" />
                      </div>
                      {userData.level && (
                        <div className="d-flex mt-1">
                          <h6 className="navHeading me-2">Level</h6>
                          <h6> {data.level}</h6>
                        </div>
                      )}
                    </div>

                    <div className="d-flex mt-4">
                      <div>
                        <TbEaseInOutControlPoints size={25} className="me-3" />
                      </div>
                      {userData.points && (
                        <div className="d-flex mt-1">
                          <h6 className="navHeading me-2">Points</h6>
                          <h6>{userData.points}</h6>
                        </div>
                      )}
                    </div>

                    <div className="d-flex mt-4" onClick={handleShow}>
                      <div>
                        <FaNoteSticky size={25} className="me-3" />
                      </div>
                      <div>
                        <h6 className="navHeading">Deposit</h6>
                      </div>
                    </div>

                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                      // className="text-white"
                    >
                      <Modal.Header className="modalbody" closeButton>
                        <Modal.Title>Add Money To Wallet</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="modalbody" closeButton>

                        <h4 className="mb-3">Wallet Ballance </h4>
                        <input
                          type="number"
                          value={amount}
                          onChange={handleAmountChange}
                          placeholder="Enter amount"
                          className="form-control "
                        />
                      </Modal.Body>
                      <Modal.Footer className="modalbody">
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Deposit amount={amount} />
                      </Modal.Footer>
                    </Modal>

                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                ""
              )}

              <w3m-button className="Btn" />

              {/* <button className="Btn"></button> */}
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
