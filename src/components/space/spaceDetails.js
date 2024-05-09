import React, { useState, useEffect } from "react";
import "./spaceMain.css";
import MyNavbar from "../navbar & footer/navbar/navbar";
import Footer from "../navbar & footer/footer/footer";
import { useLocation } from "react-router";
import {
  useReadCampaign,
  ReadSpace,
  SpaceCampaigns,
  SpaceEvents,
} from "../../services/blockchain";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

export default function SpaceDetails() {
  const location = useLocation();
  console.log(location);
  const { accumulatedData } = location?.state || {};
console.log(accumulatedData);
  const [eventDetail, setEventDetail] = useState(null);
  const spaceIndex = parseInt(window.location.pathname.split("/")[2], 10);
  console.log(spaceIndex);
  const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  console.log(selectedCampaign);

  // const [spaceCampaignData, setSpaceCampaignData] = useState();
  // const [spaceEventData, setSpaceEventData] = useState();

  // console.log(spaceCampaignData);
  // console.log(spaceEventData);

  useEffect(() => {
    if (
      accumulatedData &&
      spaceIndex >= 0 &&
      spaceIndex < accumulatedData.length
    ) {
      const selectedSpace = accumulatedData[spaceIndex];
      setEventDetail(selectedSpace);
    }
  }, [spaceIndex, accumulatedData]);

  const [spaceId, setSpaceId] = useState("1");
  console.log(spaceId);
  const [campaignID, setCampaignID] = useState([]);
  const [eventID, setEventID] = useState([]);

  const { data, isSuccess } = ReadSpace(spaceId);

  useEffect(() => {
    if (isSuccess && data[0].name) {
      setCampaignID((currentData) => [
        ...currentData,
        data[0].campaigns.toString(),
      ]);
      setEventID((currentData) => [...currentData, data[0].events.toString()]);
      setSpaceId((currentId) => String(Number(currentId) + 1));
    }
  }, [data, isSuccess, spaceId, accumulatedData]);

  console.log(campaignID, eventID);

  const spaceidsample = 3;

  //Space Campaigns

  let SpaceCampaignIds;
  if (campaignID && campaignID.length > 0) {
    // Check if spaceidsample is a valid index
    if (spaceidsample >= 1 && spaceidsample <= campaignID.length) {
      SpaceCampaignIds = campaignID[spaceidsample - 1].split(",");
    }
  }

  console.log(SpaceCampaignIds);

  const fetchedSpaceCampaign = SpaceCampaigns(SpaceCampaignIds);
  if (fetchedSpaceCampaign && fetchedSpaceCampaign.pages) {
    var CampaignData = fetchedSpaceCampaign.pages[0];
  }

  const spaceCampaignData = CampaignData.map((item) => {
    const result = item.result;
    return {
      id: result[0],
      creator: result[1],
      name: result[2],
      startTimestamp: result[3],
      endTimestamp: result[4],
      image: result[5],
      description: result[6],
      minimumBalance: result[7],
      minimumLevel: result[8],
      points: result[9],
      numberOfWinners: result[10],
      tasksURL: result[11],
      tasks: result[12],
      visibility: result[13],
      tokenReward: result[14],
    };
  });

  console.log("Space Campigns :", spaceCampaignData);

  // New
  //Space Events

  let SpaceEventIds;
  if (eventID && eventID.length > 0) {
    // Check if spaceidsample is a valid index
    if (spaceidsample >= 1 && spaceidsample <= eventID.length) {
      SpaceEventIds = eventID[spaceidsample - 1].split(",");
    }
  }

  const fetchedEventCampaign = SpaceEvents(SpaceEventIds);
  if (fetchedEventCampaign && fetchedEventCampaign.pages) {
    var Eventdata = fetchedEventCampaign.pages[0];
  }

  const spaceEventData = Eventdata.map((item) => {
    return {
      id: item.result[0],
      host: item.result[1],
      name: item.result[2],
      startTimestamp: item.result[3],
      endTimestamp: item.result[4],
      image: item.result[5],
      description: item.result[6],
      tokenReward: item.result[7],
      points: item.result[8],
      minimumCampaign: item.result[9],
      numberOfWinners: item.result[10],
      campaignIds: [item.result[0]],
      participants: [],
    };
  });

  console.log("Space Events :", spaceEventData);

  // Function to get the status of the campaign based on timestamps
  const getCampaignStatus = (startTimestamp, endTimestamp) => {
    const currentTimestamp = getCurrentTimestamp();
    if (currentTimestamp < startTimestamp) {
      return "NotStarted";
    } else if (
      currentTimestamp >= startTimestamp &&
      currentTimestamp <= endTimestamp
    ) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="container-fluid text-white campaignMainBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              {eventDetail && <h3 className="pt-3">{eventDetail.name}</h3>}
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
              <button className="spaceDetailBtn">Follow</button>
              <button className="ms-5 spaceDetailBtn">Share</button>
            </div>
          </div>
        </div>

        <div className="row mt-5 p-5">
          <div className="col-lg-6">
            {eventDetail && (
              <>
                <h3>{eventDetail.name}</h3>
                <p>
                  The first video game that merges console gaming with
                  blockchain technology, developed by Galaxy Games. Featured on
                  PlayStation, Xbox, IGN, and Steam platforms, and incubated by
                  Seedify Fund. Winner of the Epic Mega Grant.
                </p>
              </>
            )}
          </div>
          <div className="col-lg-6 d-flex justify-content-be tween text-center pt-5">
            {eventDetail && (
              <>
                <div className="col-lg-4">
                  {eventDetail.campaigns.length}
                  <br />
                  campaigns
                </div>
                <div className="col-lg-4">
                  {eventDetail.events.length}
                  <br />
                  events
                </div>
                <div className="col-lg-4">
                  20
                  <br />
                  Participants
                </div>
              </>
            )}
          </div>

          <div className="row mt-4">
            <div className="row d-flex">
              <div className="col-lg-4">
                {eventDetail && (
                  <>
                    <button className="eventButton">
                      Campaign ( {eventDetail.campaigns.length} )
                    </button>
                    <button className="ms-3 eventButton">
                      Event ( {eventDetail.events.length} )
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="row p-5">
            <h1 className="mb-3">Campaign</h1>
            {spaceCampaignData.map((item) => (
              <div key={item.id} className="col-lg-4 mb-4">
                <Link
                  to={`/campaign/${item.id}`}
                  state={{ accumulatedData: item }}
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
                      <p className="card-text">
                        MinimumBalance:{" "}
                        {/* {ethers.formatEther(item.minimumBalance)} ETH */}
                      </p>
                      <p className="card-text">
                        MinimumLevel: {item.minimumLevel}
                      </p>
                      <p className="card-text">{item.description}</p>
                    </div>
                    <div
                      class
                      Name="card-footer d-flex align-items-center justify-content-left"
                    >
                      <button className="footerButton1 me-2 pb-1">
                        {/* {ethers.formatEther(item.tokenReward)}{" "} */}
                        <small>Eth</small>
                      </button>
                      <button className="footerButton2 pb-1">
                        {item.points} <small>pts</small>
                      </button>
                    </div>
                    <div>
                      <div
                        className={`status-bar-inner d-flex justify-content-center mt-2 align-items-center text-center  text-white fw-bold ${getCampaignStatus(
                          item.startTimestamp,
                          item.endTimestamp
                        )}`}
                      >
                        {getCampaignStatus(
                          item.startTimestamp,
                          item.endTimestamp
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="row p-5">
            <h1>Event</h1>
          {spaceEventData.map((item) => (
            <div key={item.id} className="col-lg-4 mb-2">
              <Link
                to={`/event/${item.id}`}
                state={{ accumulatedData : item }}
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
        </div>
      </div>
      <Footer />
    </>
  );
}
