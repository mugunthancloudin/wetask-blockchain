import React from "react";
import "./home.css";
import token from "../../assets/home/token.svg";
import nft from "../../assets/home/nft.svg";

export default function Home() {
  return (
    <>
      <div className="container homeBg ">
        <div className="row">
          <div className="col-lg-6 text-white">
            <h1 className="homeH1 ">
              <span className="spanh1">TaskOn</span> - Web3 Collaboration
              Platform
            </h1>
            <h6 className="mt-4">
              TaskOn is a platform that boosts the completion for various Web3
              tasks in a decentralized way. It helps task initiators and
              implementers to collaborate efficiently and better align mutual
              interests. Make full use of TaskOn and start earning now!


            </h6>
            <div className="d-flex mt-3 ">
              <button className="home-btn1">Explore</button>
              <button className="home-btn2">Create</button>
            </div>
          </div>
          <div className="col-lg-6 d-none d-sm-block">
            <div className="position-relative">
              <div className="rewardBg mt-5 ms-5 p-4">
                <span className="ps-5  text-center text-white">
                  Rewards Are Only Tasks Away
                </span>
              </div>
            
              <div className="tokenBg py-5 mt-3  ps-4">
                <img src={token} alt="token" className="pt-3 ps-4" />
                <h3 className="ms-2 mt-2 text-success">$2.49M +</h3>
              </div>

              <div className="nftBg pt-5 ps-4">
                <img src={nft} alt="nft" className="pt-2 ps-4" />
                <h6 className="ms-2 mt-2 text-warning">$2.49M +</h6>
              </div>

              <div className="text-center  py-3 rewardText ">
                <h6 className="fw-bold">* ALL TIME DISTRIBUTED</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
