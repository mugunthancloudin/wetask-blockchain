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
       <div className="container-fluid bg-black text-white">
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                     <img src={product.image} alt='productImage' className='w-100'/>
                    <p className="card-text">Category: {product.category}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">{product.description}</p>
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
 