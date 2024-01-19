import React from "react";
import Lottie from "lottie-react";
import loading from "../assets/construction/underConstruction.json";
import soon from "../assets/construction/comeingSoon.json";


export default function UnderConstruction() {
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <Lottie
            animationData={loading}
            loop={true}
            autoplay={true}
            style={{ width: "100%" }}
            className=""
          />
        </div>
        <div className="col-lg-6">
          <Lottie
            animationData={soon}
            loop={true}
            autoplay={true}
            style={{ width: "100%" }}
            className="mt-5"
          />
        </div>
      </div>
    </>
  );
}
