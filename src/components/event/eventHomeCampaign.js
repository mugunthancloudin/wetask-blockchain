import React, { useState, useEffect } from "react";
import { useReadEvent, useReadCampaign, JoinEvent } from "../../services/blockchain.js";
import { Link } from "react-router-dom";


export default function EventHomeCampaign(id) {
  const  eventId  = id.id;
  console.log(eventId);
  const { data, isSuccess } = useReadEvent(eventId);
  // const [campaignDetails, setCampaignDetails] = useState([]);
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [campaignIds, setCampaignIds] = useState([]);

  const { data: campaignData, isSuccess: campaignSuccess } =
    useReadCampaign(campaignIds);

  // Counter to keep track of which index to set as campaignIds
  const [indexToSet, setIndexToSet] = useState(0);

  // Fetch campaign details when campaignIds change
  useEffect(() => {
    if (isSuccess && data[1] && indexToSet <= data[1].length) {
      // Extracting campaign ID at indexToSet from data and converting to number
      const id = parseInt(data[1][indexToSet], 10);
      setCampaignIds([id]); // Set campaignIds with the current index's ID
      setIndexToSet((prevIndex) => prevIndex + 1); // Move to the next index for the next call

      // Update campaignDetails with campaignData[0]
      if (campaignData && campaignData.length > 0) {
        // setCampaignDetails((prevDetails) => [...prevDetails, campaignData[0]]);
        setAccumulatedData((prevDetails) => [...prevDetails, campaignData[0]]);

      }
    }
  }, [isSuccess, data, indexToSet, campaignData]);

  // Log campaign details
  // console.log(campaignDetails);
  console.log(accumulatedData);

 return (
    <>
            <div className="row justify-content-center mt-3">
          {accumulatedData.map((item) => (
            <div key={item.id} className="col-lg-6 mb-4 p-5">
              <Link
                to={`/campaign/${item.id}`}
                state={{ accumulatedData }}
                style={{ textDecoration: "none" }}
              >
                <div className="card eventCardBg d-flex flex-column">
                  <div className="card-body text-white">
                    <img
                      src={`https://ipfs.moralis.io:2053/ipfs/${item.image}`}
                      alt="productImage"
                      className="w-100 h-50"
                      style={{ objectFit: "cover" }}
                    />
                    <p className="card-title mt-3">{item.name}</p>
                    <p className="card-text">{item.description}</p>
                    <button className="eventBtn">WL</button>
                  </div>

                  <div></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
    </>
 )}