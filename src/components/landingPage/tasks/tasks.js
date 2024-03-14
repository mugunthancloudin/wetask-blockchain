import React from "react";
import "./tasks.css";
import share from "../../assets/data/share.png";
import MobileFalse from "../../assets/home/MobileFalse.webp";

import Lottie from "lottie-react";
import homeanime from "../../assets/data/token.json";

export default function Tasks() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 ">
            <div className="taskDiv">
              <img src={share} alt="share" width="100%" />
            </div>

            {/* <Lottie
                animationData={homeanime}
                loop={true}
                autoplay={true}
                style={{ width: "100%" }}
                className="taskLootie"
              /> */}
              
          </div>
          <div className="col-lg-6 text-light ">
            <h3 className="fw-bold mt-5 pt-5">Web3 Login</h3>
            <h3 className="mt-5 ">Microtasks, Mega Earnings</h3>
            <p className="mt-3 fs-5 lh-lg fw-light">
              Whether you're a student, a stay-at-home parent, a freelancer, or
              anyone looking to boost their income, JumpTask offers a diverse
              range of microtasks that require no special skills. Take surveys,
              play games, or do quick 3-5 minute tasks – turn spare moments into
              valuable earnings.
            </p>

            {/* <p className="fw-bold ">Web3 Login</p>
            <p className="fw-bold">Automatic Verification</p> */}

          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-6 text-light ">
            <h3 className="fw-bold mt-5 pt-5"></h3>
            <h3 className="mt-5 ">Be the first to join WeTask community!</h3>
            <p className="mt-3 fs-5 lh-lg fw-light">
              ACQR is a on-chain platform that benefits both Web3 users and Web3
              protocols by incentivizing participation. Be the first join ACQR’s
              community of Web3 users and protocols!
            </p>
          </div>

          <div className="col-lg-6 ">
            <div className="taskDiv d-flex justify-content-center align-items-center">
              <Lottie
                animationData={homeanime}
                loop={true}
                autoplay={true}
                style={{ width: "80%" }}
                className="taskLootie"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
