import React from "react";
import "./footer.css";
import logo from "../../assets/navbar/logo.svg";
import { FaDiscord, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
export default function Footer() {
  return (
    <>
      <div className="container-fluid text-white py-5 footer-body">
        <div className="row footer-cont justify-content-between ">
          <div className="col-lg-4 ps-5 align-self-center mb-5">
            <h3 className="">
              <img src={logo} alt="logo" className="pb-1 me-2" />
              <span className="footerTitle">TaskOn</span>
            </h3>
            <h4 className="footerH4">Boosts Web3 Colaboration</h4>
          </div>
          <div className="col-lg-2">
            <h5>TaskOn</h5>
            <p className="mt-4">Explore</p>
            <p>Create campaign</p>
            <p>Entity Hub</p>
            <p>User Center</p>
            <p>Testnet</p>
          </div>
          <div className="col-lg-2">
            <h5>Support</h5>
            <p className="mt-4">User Tutorial</p>
            <p>Create Handbook</p>
            <p>Apply for Verification</p>
            <p>Marketing partnership</p>
            <p>Press Kit</p>
            <p>Medium</p>
          </div>
          <div className="col-lg-2">
            <h5>Contact Us</h5>
            <p className="mt-4">
              <FaXTwitter className="footerIcons" size={20} /> Twitter
            </p>
            <p>
              <FaDiscord size={20} className="footerIcons" /> Discord
            </p>
            <p>
              <FaTelegram size={20} className="footerIcons" /> Telegram
            </p>
            <p>
              <MdEmail size={20} className="footerIcons" /> Email Us
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
