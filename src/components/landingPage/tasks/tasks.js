import React from "react";
import "./tasks.css";
import Lottie from "lottie-react";
import homeanime from "../../assets/home/homeAnime.json";

export default function Tasks() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="col-lg-6">
              <Lottie
                animationData={homeanime}
                loop={true}
                autoplay={true}
                // style={{ width: "100%" }}
                className="taskLootie"
              />
            </div>
          </div>
          <div className="col-lg-6 text-light ">
            <h3 className="mt-5 ">Verified Projects</h3>
            <p className="mt-3 fw-bold">Discover 1600 + Notable Project Spaces Trustable and Pledged Rewards</p>
            <p className="fw-bold ">Web3 Login</p>
            <p className="fw-bold">Automatic Verification</p>
          </div>
        </div>
      </div>
    </>
  );
}
