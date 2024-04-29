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

export default function SpaceHome() {
  const [spaceId, setSpaceId] = useState("1");
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [campaignID, setCampaignID] = useState([]);
  const [eventID, setEventID] = useState([]);

  const { data, isSuccess } = ReadSpace(spaceId);

  useEffect(() => {
    if (isSuccess && data[0].name) {
      setAccumulatedData((currentData) => [...currentData, data[0]]);
      setCampaignID((currentData) => [...currentData, data[0].campaigns]);
      setEventID((currentData) => [...currentData, data[0].events]);
      setSpaceId((currentId) => String(Number(currentId) + 1));
    }
  }, [data, isSuccess, spaceId, accumulatedData]); // Ensure all relevant variables are included in dependency array

  console.log("All Space Data", accumulatedData);

  const [spaceCId, setSpaceCID] = useState("");
  const [CampaignDetails, setCampaignDetails] = useState(null);

  const { data: SpaceCampaign } = GetSpaceCampaign(spaceCId);
  useEffect(() => {
    if (SpaceCampaign) {
      setCampaignDetails(SpaceCampaign[0]);
    }
  });

  console.log(CampaignDetails);

  const [spaceEId, setSpaceEID] = useState("");
  const [EventDetails, setEventDetails] = useState(null);

  const { data: spaceEvent } = useReadEvent(spaceEId);
  useEffect(() => {
    if (spaceEvent) {
      setEventDetails(spaceEvent[0]);
    }
  });

  console.log(EventDetails);

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
