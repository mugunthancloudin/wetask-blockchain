import React, { useState, useEffect } from "react";
import { ReadCampaign } from "../../services/blockchain";
import { Link } from "react-router-dom";
import { isError } from "ethers";
import banner from "../assets/campaignBanner/dragonCamp.png";
import CampaignJoin from "./campaignJoin";
import "./campaign.css";

const CampaignHome = () => {
  const [campaignId, setCampaignId] = useState("1");
  const [accumulatedData, setAccumulatedData] = useState([]);
  const { data, isSuccess } = ReadCampaign(campaignId);

  // Log accumulatedData for debugging
  console.log("accumulatedData:", accumulatedData);

  useEffect(() => {
    if (isSuccess) {
      const convertedData = {
        ...data[0],
        endTimestamp: data[0].endTimestamp.toString(),
        id: data[0].id.toString(),
        minimumBalance: data[0].minimumBalance.toString(),
        minimumLevel: data[0].minimumLevel.toString(),
        points: data[0].points.toString(),
        numberOfWinners: data[0].numberOfWinners.toString(),
        randomnessBlockNumber: data[0].randomnessBlockNumber.toString(),
        startTimestamp: data[0].startTimestamp.toString(),
        tokenReward: data[0].tokenReward.toString(),
      };
      setAccumulatedData((currentData) => [...currentData, convertedData]);
      setCampaignId((currentId) => String(Number(currentId) + 1));
    } else if (isError) {
      console.log("completed fetching");
    } else {
      console.log("error");
    }
  }, [data, isSuccess, campaignId, accumulatedData]);

  const handleCampaignClick = (id) => {
    // Find the clicked campaign object by id
    const clickedCampaign = accumulatedData.find((item) => item.id === id);
    console.log("Clicked campaign details:", clickedCampaign);
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
                      className="w-75 h-50"
                      style={{ objectFit: "cover" }}
                    />
                    <p className="card-title mt-3">{item.name}</p>
                    <p className="card-text">MinimumBalance: ${item.minimumBalance}</p>
                    <p className="card-text">MinimumLevel: ${item.minimumLevel}</p>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-left">
                    <button className="footerButton1 me-2 pb-1">SBT</button>
                    <button className="footerButton2 pb-1">SBT</button>
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