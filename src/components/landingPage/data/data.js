import React from "react";
import "./data.css";
import Lottie from "lottie-react";
import data from "../../assets/data/anouncements.json";
import CountUp, { useCountUp } from "react-countup";

export default function Data() {
  return (
    <>
      <div className="container text-white">
        <div className="row pt-5">
        <div className="col-lg-7">
            <h1>Data Across The Entire Platform</h1>
            <h5 className="mt-5">Campaigns</h5>
            <h1 className="mt-3">
              <CountUp end={14228} enableScrollSpy scrollSpyDelay={500} /> <span className="dataCountColor">+</span>
            </h1>

            <h5 className="mt-5">Projects/DAOs</h5>
            <h1 className="mt-3">
              <CountUp end={8732} enableScrollSpy scrollSpyDelay={500} /> <span className="dataCountColor">+</span>
            </h1>
          </div>

          <div className="col-lg-5">
            <Lottie
              animationData={data}
              loop={true}
              autoplay={true}
              style={{ width: "80%" }}
              className="mb-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}
