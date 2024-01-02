import React from "react";
import "./card.css";

export default function Card() {
  return (
    <>
      <div className="container carditems">
        {/* <div className="row">
          <div className="col-lg-6 mt-3">
            <div className="card homeCard">
              <div className="card-innerCard">
                <div className="card-frontCard text-start text-dark">
                  <h3 className="">PROJECT & DAO</h3>
                  <p className="">Grow Your Community</p>

                  <p className="fs-6 fst-italic fw-bold">
                    Task Templates Full Support for Mainstream Platform Tasks
                    Token/NFT Balance & Transactions
                    (Swap/Liquidity/Borrow/Supply/Stake)
                  </p>
                </div>
                <div className="card-backCard text-dark">
                  <h5 className="fw-boldy">Benefits</h5>
                  
                  <ul className="fs-6 fw-bold fst-italic">
                    <li className="mt-3">Brand Exposure Community Engagement</li>
                    <li >Rich Campaigns/Events Templates</li>
                    <li>Loyalty Program/NFT Mint/Token Airdrop</li>
                    <li>Large Community with High MAU/DAU</li>
                    <li>Free & Permissionless & Easy to Use</li>
                    <li>Rich User Filter Criteria & Anti-Bot</li>
                  </ul>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2">&nbsp;</div>
          <div className="col-lg-6 mt-3">
            <div className="card homeCard">
              <div className="card-innerCard">
                <div className="card-frontCard text-dark text-end">
                  <h1>USER</h1>
                  <p className="mt-5">Discover & Earn</p>
                </div>
                <div className="card-backCard">
                  <p>Back Side</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row justify-content-around">
          <div className="col-lg-5">
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
                  <p className="">Grow Your Community</p>

                  <p className="fs-6 fst-italic fw-bold">
                    Task Templates Full Support for Mainstream Platform Tasks
                    Token/NFT Balance & Transactions
                    (Swap/Liquidity/Borrow/Supply/Stake)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="book1">
              <div className="content1">


              </div>
              <div className="cover1">
                <div className="content1">
                <h1>USER</h1>
                  <p className="mt-5">Discover & Earn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
