  import React from "react";
  import "./spaceMain.css";
  import { useState, useEffect } from "react";
  import {
    ReadSpace,
    SpaceCampaigns,
    SpaceEvents,
    useReadCampaign,
    useReadEvent,
    GetSpaceCampaign,
    GetSpaceEvents,
  } from "../../services/blockchain";
  import { Link } from "react-router-dom";

  export default function SpaceHome() {
    const [spaceId, setSpaceId] = useState("1");
    const [accumulatedData, setAccumulatedData] = useState([]);
    const [campaignID, setCampaignID] = useState([]);
    const [eventID, setEventID] = useState([]);

    const { data, isSuccess } = ReadSpace(spaceId);
    // console.log(data[0]);

    useEffect(() => {
      if (isSuccess && data[0].name) {
        setAccumulatedData((currentData) => [...currentData, data[0]]);
        setCampaignID((currentData) => [...currentData, data[0].campaigns.toString()]);
        setEventID((currentData) => [...currentData, data[0].events.toString()]);
        setSpaceId((currentId) => String(Number(currentId) + 1));
      }
    }, [data, isSuccess, spaceId, accumulatedData]); // Ensure all relevant variables are included in dependency array

    console.log("All Space Data", accumulatedData);
    
    const spaceidsample = 3;
    let SpaceCampaignIds;
    if (campaignID && campaignID.length > 0) {
      // Check if spaceidsample is a valid index
      if (spaceidsample >= 1 && spaceidsample <= campaignID.length) {
          SpaceCampaignIds = campaignID[spaceidsample - 1].split(',');
      }
    }

      const campaignDataArray = [];
      if (SpaceCampaignIds && SpaceCampaignIds.length >0) {
        for (const id of SpaceCampaignIds) {
          const data =  GetSpaceCampaign([id]);
          campaignDataArray.push(data);
        }
      }
      console.log(campaignDataArray);
      

      let SpaceEventIds;
    if (eventID && eventID.length > 0) {
      // Check if spaceidsample is a valid index
      if (spaceidsample >= 1 && spaceidsample <= eventID.length) {
        SpaceEventIds = eventID[spaceidsample - 1].split(',');
      }
    }

      const eventDataArray = [];
      if (SpaceEventIds && SpaceEventIds.length >0) {
        for (const id of SpaceEventIds) {
          const data =  GetSpaceEvents([id]);
          eventDataArray.push(data);
        }
      }
      console.log(eventDataArray);
      
      

    return (
      <>
        <div className="container-fluid campaignMainBg">
          <div className="container">
            <div className="row pt-2">
              {accumulatedData.map((item, index) => (
                <div className="col-lg-4">
                  <Link
                    to={`/space/${index}`}
                    state={{ accumulatedData }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card campaignHomeCard text-white" key={index}>
                      <img
                        src={`https://ipfs.moralis.io:2053/ipfs/${item.image}`}
                        alt="productImage"
                        className="mappingCardImg"
                        // style={{ objectFit: "contain" }}
                      />
                      <h3>{item.name}</h3>
                      <h5>Events : {item.events.length}</h5>
                      <h5>Campaigns : {item.campaigns.length}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
