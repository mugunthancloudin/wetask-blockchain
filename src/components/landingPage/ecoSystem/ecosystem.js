import React from "react";
import { HiRocketLaunch } from "react-icons/hi2";
import { HiCurrencyDollar } from "react-icons/hi";
import ecosys from "../../assets/ecosys/ecosys.png";
import "./ecosystem.css";

export default function Ecosystem() {
  return (
    <>
      <div className="container ecoHome">
        <div className="row text-white">
          <h3 className="fw-bold text-center">
            THE WeTask ECOSYSTEM SUPPORTS WEB3 PROJECTS AT THEIR EARLIEST
            STAGES.
          </h3>
          <div className="col-lg-7 mt-5">
            {/* <h5>COMING SOON</h5> */}
            <h1 className="mt-2 ecoH1">WeTask</h1>
            <p className="mt-4 fs-5 fw-light">
              A web3 native crowdfunding protocol. We give you access to the
              best early stage web3 products and communities. You support them
              and in return get exclusive access and rewards.
            </p>
            <div className="row mt-5">
              <div className="col-lg-6 d-flex">
                <div className="col-lg-2">
                  <HiRocketLaunch size={30} />
                </div>
                <div className="col-lg-8">
                  <h5>Launch</h5>
                  <p>
                    Build traction from day one. Grow your socials and build
                    momentum.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 d-flex">
                <div className="col-lg-2">
                  <HiCurrencyDollar size={30} />
                </div>
                <div className="col-lg-8">
                  <h5>Raise</h5>
                  <p>
                    Raise initial funds needs to scale your project and reward
                    your community
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="mt-5 text-nowrap ecoButton">
                Get Started Today
              </button>
            </div>
          </div>
          <div className="col-lg-5 mt-5">
            <img src={ecosys} alt="ecosys" width="100%" height="500vh" />
          </div>
        </div>
      </div>
    </>
  );
}
