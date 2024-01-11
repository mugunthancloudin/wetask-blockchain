import React from "react";
import "./style.css";
import Home from "../components/landingPage/home/home";
import Footer from "../components/navbar & footer/footer/footer";
import MyNavbar from "../components/navbar & footer/navbar/navbar";
import Referal from "../components/create/referal/referal";
import Login from "../components/create/login/login";
import Data from "../components/landingPage/data/data";
import Card from "../components/landingPage/card/card";
import Tasks from "../components/landingPage/tasks/tasks";


export default function LandingPage() {
  return (
    <>
      <div className="container-fluid landingBg">
        <div className="">
          <MyNavbar />
          <w3m-button/>
          <Home />
          <Data/>
          <Tasks/>
          <Card/>
          {/* <Referal/> */}
          <Footer />
          {/* <Login/> */}
        </div>
      </div>
    </>
  );
}
