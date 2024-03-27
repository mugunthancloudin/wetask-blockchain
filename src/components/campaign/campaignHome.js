import React, { useState, useEffect } from "react";
import { useReadCampaign } from "../../services/blockchain";
import { Link } from "react-router-dom";
import { isError } from "ethers";
import { ethers } from 'ethers';
import banner from "../assets/campaignBanner/dragonCamp.png";
import CampaignJoin from "./campaignJoin";
import "./campaign.css";

const CampaignHome = () => {
  const [campaignId, setCampaignId] = useState("1");
  const [accumulatedData, setAccumulatedData] = useState([]);
  const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

  const { data, isSuccess } =  useReadCampaign(campaignId);

  // Log accumulatedData for debugging
  console.log("accumulatedData:", accumulatedData);

  useEffect(() => {
    if (isSuccess) {
      setAccumulatedData((currentData) => [...currentData, data[0]]);
      setCampaignId((currentId) => String(Number(currentId) + 1));
    }
  }, [data, isSuccess, campaignId, accumulatedData]);

  const handleCampaignClick = (id) => {
    // Find the clicked campaign object by id
    const clickedCampaign = accumulatedData.find((item) => item.id === id);
    console.log("Clicked campaign details:", clickedCampaign);
  };

  // Function to get the status of the campaign based on timestamps
  const getCampaignStatus = (startTimestamp, endTimestamp) => {
    const currentTimestamp = getCurrentTimestamp();
    if (currentTimestamp < startTimestamp) {
      return "NotStarted";
    } else if (currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  };

  return (
    <>
      <div className="container-fluid campaignMainBg text-white">
        <div className="row">
          <img src={banner} alt="banner" />
        </div>
        <div className="row p-5">  
          {accumulatedData.map((item) => (
            <div key={item.id} className="col-lg-3 mb-4">
              <Link
                to={`/campaign/${item.id}`}
                state={{ accumulatedData }}
                style={{ textDecoration: "none" }}
              >
                <div className="card h-100 campaignHomeCard d-flex flex-column">
                  <div className="card-body text-white">
                    <img
                      src={`https://ipfs.moralis.io:2053/ipfs/${item.image}`}
                      alt="productImage"
                      className="w-100 h-50"
                      style={{ objectFit: "cover" }}
                    />
                    <p className="card-title mt-3">{item.name}</p>
                    <p className="card-text">MinimumBalance: {ethers.formatEther(item.minimumBalance)} ETH</p>
                    <p className="card-text">MinimumLevel: {item.minimumLevel}</p>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-left">
                    <button className="footerButton1 me-2 pb-1">{ethers.formatEther(item.tokenReward)} <small>Eth</small></button>
                    <button className="footerButton2 pb-1">{item.points} <small>pts</small></button>
                  </div>
                  <div>
                    <div className={`status-bar-inner d-flex justify-content-center align-items-center text-center  text-white fw-bold ${getCampaignStatus(item.startTimestamp, item.endTimestamp)}`}>
                    {getCampaignStatus(item.startTimestamp, item.endTimestamp)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CampaignHome;