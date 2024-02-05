import React from "react";
import "./card.css";
import { FaDiscord, FaTwitter, FaWallet } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { BsFire } from "react-icons/bs";

export default function Card() {
  return (
    <>
      <div className="container-fluid carditems">
        <div className="row justify-content-center">
          <div className="col-lg-6 mt-5 justify-content-center d-flex align-content-center ">
            <div className="card mainCard">
              <div className="content">
                <div className="back">
                  <div className="back-content px-5">
                    <h3 className="">PROJECT & DAO</h3>
                    <p className="">Grow Your Community</p>

                    <p className="fs-6 fst-italic fw-bold">
                      Task Templates Full Support for Mainstream Platform Tasks
                      Token/NFT Balance & Transactions
                      (Swap/Liquidity/Borrow/Supply/Stake)
                    </p>
                  </div>
                </div>
                <div className="front">
                  <div className="front-content p-4">
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

          <div className="col-lg-6 mt-5 justify-content-center d-flex align-content-center ">
            <div className="card mainCard">
              <div className="content">
                <div className="back">
                  <div className="back-content">
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
                <div className="front">
                  <div className="front-content p-4">
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
