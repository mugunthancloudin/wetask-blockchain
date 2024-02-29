import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReadCampaign } from "../../services/blockchain";
import banner from "../assets/campaignBanner/dragonCamp.png";
import "./campaign.css";
import CampaignDetails from "./campaigndetails"; // Import CampaignDetails

const CampaignHome = () => {
  const [campaignId, setCampaignId] = useState("1");
  const [accumulatedData, setAccumulatedData] = useState([]);
  const { data, isSuccess } = ReadCampaign(campaignId);

  console.log(data);
  console.log(campaignId);
  console.log(accumulatedData);

useEffect(() => {
    if (isSuccess) {
      setAccumulatedData((currentData) => [...currentData, data[0]]);
      setCampaignId((currentId) => String(Number(currentId) + 1));
    }
}, [data, isSuccess, campaignId]);

return (
    <div className="container-fluid campaignMainBg text-white">
      <div className="row">
        <img src={banner} alt="banner" />
      </div>
      <div className="row p-5">
        {accumulatedData.map((item) => (
          <div key={item.id} className="col-lg-3 mb-4">
            <Link
              to={`/campaign/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card h-100 campaignHomeCard">
                <div className="card-body text-white">
                  <img
                    src={`https://ipfs.moralis.io:2053/ipfs/${item.image}`}
                    alt="productImage"
                    className="w-75 h-50"
                    style={{ objectFit: "100%" }}
                  />
                  <h5 className="card-title">{item.endTimestamp.toString()}</h5>
                  <p className="card-title">{item.name}</p>
                  <p className="card-text">Price: ${item.startTimestamp}</p>
                  <p className="card-text">{item.description}</p>
                  {item.endTimestamp}
                </div>
                <div className="card-footer d-flex align-items-center justify-content-left">
                  <button className="footerButton1 me-2 pb-1">SBT</button>
                  <button className="footerButton2 pb-1">TOKEN</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignHome;
