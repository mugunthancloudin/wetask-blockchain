import React from "react";
import "./card.css";
import { FaDiscord, FaTwitter, FaWallet } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { BsFire } from "react-icons/bs";

export default function Card() {
  return (
    <>
      <div className="container-fluid carditems">
        {/* <div className="row justify-content-around">
          <div className="col-lg-5 mt-5">
            <div className="book">
              <div className="content">
                <h5 className="fw-boldy">Benefits</h5>

                <ul className="fs-6 fw-bold fst-italic">
                  <li className="mt-3">Brand Exposure Community Engagement</li>
                  <li>Rich Campaigns/Events Templates</li>
                  <li>Loyalty Program/NFT Mint/Token Airdrop</li>
                  <li>Large Community with High MAU/DAU</li>
                  <li>Free & Permissionless & Easy to Use</li>
                  <li>Rich User Filter Criteria & Anti-Bot</li>
                </ul>
              </div>
              <div className="cover">
                <div className="content">
                  <h3 className="">PROJECT & DAO</h3>
                  <p className="mt-4">Grow Your Community</p>

                  <p className="fs-6 fst-italic fw-bold">
                    Task Templates Full Support for Mainstream Platform Tasks
                    Token/NFT Balance & Transactions
                    (Swap/Liquidity/Borrow/Supply/Stake)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 mt-5">
            <div className="book1">
              <div className="content1 p-5">
                <h6>All You Need </h6>
                <div className="row  d-flex">


                  <div className="col-lg-6 ">
                    <p className="fs-6 text-nowrap">Social Media Account</p>
                    <div className="d-flex">
                      <FaDiscord size={25} />
                      <FaTwitter size={25} className="ms-4" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <p className="ms-md-5 mt--3">With Wallet</p>
                    <FaWallet size={25} className="ms-md-5 " />
                  </div>

                </div>

                <div className="row mt-4">
                  <div className="col-lg-6">
                    <p className="fs-6 text-nowrap">Earn Rewards</p>
                    <div className="d-lg-flex">
                      <button className="rewardsButton">Token</button>
                      <button className="ms-md-3 mt-3 mt-md-0 rewardsButton">NFT</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cover1">
                <div className="content1">
                  <h1 className="text-center">USER</h1>
                  <p className="mt-3 text-center">Discover & Earn</p>
                  <div className="row d-flex">
                    <div className="d-flex">
                      Create Campign{" "}
                      <div className="box ms-3">
                        <span className="arrowDiv"> &#x2197; </span>
                      </div>
                    </div>

                    <div className="d-flex">
                    Explore Campign{" "}
                      <div className="box ms-3">
                        <span className="arrowDiv"> &#x2197; </span>
                      </div>
                    </div>


                  
                  </div>
                  <div className="row mt-4">
               
                    <p className="d-flex"><BsFire size={25} className="me-2" /> Treanding Events</p>
                    <p className="d-flex"><MdEmojiEvents size={25} className="me-2" /> Hot Events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="row justify-content-center">
          <div className="col-lg-6 justify-content-center d-flex align-content-center ">
            <div class="card">
              <div class="content">
                <div class="back">
                  <div class="back-content px-5">
                    <h3 className="">PROJECT & DAO</h3>
                    <p className="">Grow Your Community</p>

                    <p className="fs-6 fst-italic fw-bold">
                      Task Templates Full Support for Mainstream Platform Tasks
                      Token/NFT Balance & Transactions
                      (Swap/Liquidity/Borrow/Supply/Stake)
                    </p>
                  </div>
                </div>
                <div class="front">
                  <div class="front-content p-4">
                    <h3 className="fw-boldy mt-4 text-center">Benefits</h3>

                    <ul className="fs-6 fw-bold fst-italic">
                      <li className=" ">Brand Exposure Community Engagement</li>
                      <li>Rich Campaigns/Events Templates</li>
                      <li>Loyalty Program/NFT Mint/Token Airdrop</li>
                      <li>Large Community with High MAU/DAU</li>
                      <li>Free & Permissionless & Easy to Use</li>
                      <li>Rich User Filter Criteria & Anti-Bot</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 justify-content-center d-flex align-content-center ">
            <div class="card">
              <div class="content">
                <div class="back">
                  <div class="back-content">
                    <h1 className="text-center">USER</h1>
                    <p className="mt-1 text-center">Discover & Earn</p>

                    <div className="row mt-1">
                      <p className="d-flex">
                        <BsFire size={25} className="me-2" /> Treanding Events
                      </p>
                      <p className="d-flex">
                        <MdEmojiEvents size={25} className="me-2" /> Hot Events
                      </p>
                    </div>
                  </div>
                </div>
                <div class="front">
                  <div class="front-content p-4">
                    <h3 className="mt-3  text-center">All You Need </h3>
                    <div className="row  d-flex">
                      <div className="col-lg-6 ">
                        <p className="fs-6 text-nowrap">Social Media Account</p>
                        <div className="d-flex">
                          <FaDiscord size={25} />
                          <FaTwitter size={25} className="ms-4" />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <p className="ms-md-5 mt--3">With Wallet</p>
                        <FaWallet size={25} className="ms-md-5 " />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <p className="fs-6 text-nowrap">Earn Rewards</p>
                        <div className="d-lg-flex">
                          <button className="rewardsButton">Token</button>
                          <button className="ms-md-3 mt-3 mt-md-0 rewardsButton">
                            NFT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}







.card {
    overflow: visible;
    width: 500px;
    height: 300px;
    background: rgb(232,38,102);
    background: linear-gradient(140deg, rgba(232,38,102,1) 0%, rgba(61,56,141,1) 100%); 
  }
  
  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
    background: rgb(232,38,102);
    background: linear-gradient(140deg, rgba(232,38,102,1) 0%, rgba(61,56,141,1) 100%); 
  }
  
  .front, .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
    background: rgb(232,38,102);
    background: linear-gradient(140deg, rgba(232,38,102,1) 0%, rgba(61,56,141,1) 100%); 
  }
  
  .back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: rgb(232,38,102);
    background: linear-gradient(140deg, rgba(232,38,102,1) 0%, rgba(61,56,141,1) 100%); 
  }
  
  .back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(101deg, #5c4df1 4%, #ea52f0 61%, #eb9f5c 108%);
      animation: rotation_481 5000ms infinite linear;
  }
  
  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  
  .card:hover .content {
    transform: rotateY(180deg);
  }
  
  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }
  
    0% {
      transform: rotateZ(360deg);
    }
  }
  
  .front {
    transform: rotateY(180deg);
    color: white;
  }
  
  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .front-content .badge {
    background-color: #00000055;
    padding: 2px 10px;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    width: fit-content;
  }
  
  .description {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 10px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
  }
  
  .title {
    font-size: 11px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  .title p {
    width: 50%;
  }
  
  .card-footer {
    color: #ffffff88;
    margin-top: 5px;
    font-size: 8px;
  }
  
  .front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ffbb66;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
  }
  
  #bottom {
    background-color: #ff8866;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
  }
  
  #right {
    background-color: #ff2233;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
  }
  
  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
  
    50% {
      transform: translateY(10px);
    }
  
    100% {
      transform: translateY(0px);
    }
  }

