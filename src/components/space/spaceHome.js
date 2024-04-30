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
  } from "../../services/blockchain";
  import { Link } from "react-router-dom";
import SpaceCampEventDetails from "./spaceCampEventDetails";

  export default function SpaceHome() {
    const [allSpaceId, setallSpaceId] = useState("1");
    const [allSpaceData, setAllSpaceData] = useState([]);
    // const [campaignID, setCampaignID] = useState([]);
    // const [eventID, setEventID] = useState([]);

    const { data, isSuccess } = ReadSpace(allSpaceId);
    // console.log(data);

    useEffect(() => {
      if (isSuccess && data[0].name) {
        setAllSpaceData((currentData) => [...currentData, data[0]]);
        setallSpaceId((currentId) => String(Number(currentId) + 1));
      }
    }, [data, isSuccess, allSpaceId]); // Ensure all relevant variables are included in dependency array

    console.log("All Space Data", allSpaceData);

    return (
      <>
        <div className="container-fluid campaignMainBg">
          <div className="container">
            <div className="row pt-2">
              {allSpaceData.map((item, index) => (
                <div className="col-lg-4">
                  <Link
                    to={`/space/${index}`}
                    state={{ allSpaceData }}
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
              <SpaceCampEventDetails />
            </div>
          </div>
        </div>
      </>
    );
  }
