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
  const { accumulatedData } = location?.state || {};
  const [eventDetail, setEventDetail] = useState(null);
  const spaceIndex = parseInt(window.location.pathname.split("/")[2], 10);
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

  const spaceidsample = 3;
  //Space Campaigns

  let SpaceCampaignIds;
  if (campaignID && campaignID.length > 0) {
    // Check if spaceidsample is a valid index
    if (spaceidsample >= 1 && spaceidsample <= campaignID.length) {
      SpaceCampaignIds = campaignID[spaceidsample - 1].split(",");
    }
  }

  // console.log(SpaceCampaignIds);

  const fetchedSpaceCampaign = SpaceCampaigns(SpaceCampaignIds);
  if (fetchedSpaceCampaign && fetchedSpaceCampaign.pages) {
    // setSpaceCampaignData(fetchedSpaceCampaign.pages[0])
    var spaceCampaignData = fetchedSpaceCampaign.pages[0];
    console.log(spaceCampaignData);
    // console.log("Space Campaigns : ", fetchedSpaceCampaign.pages[0]);
  }

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
    // setSpaceEventData(fetchedEventCampaign.pages[0])
    // const spaceEventData = fetchedEventCampaign.pages[0];
    // console.log(spaceEventData);
    console.log("Space Events : ", fetchedEventCampaign.pages[0]);
  }

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

          <div className="row">
            <div className="row p-5">
              {spaceCampaignData.map((item, index) => (
                <div key={index} className="col-lg-4 mb-4 ">
                  {console.log(item)}
                  {item.result.flat().map((campaign, campaignIndex) => {
                    {
                      spaceCampaignData.map((item, index) => (
                        <div key={index} className="col-lg-4 mb-4 ">
                          {/* {console.log(item)} */}
                          {item.result.flat().map((campaign, campaignIndex) => {
                            console.log(campaign);
                            return (
                              <Link
                                to={`/campaign/${campaign.id}`}
                                state={{ accumulatedData }}
                                style={{ textDecoration: "none" }}
                                key={campaignIndex}
                                onClick={() => setSelectedCampaign(campaign)}
                              >
                                <div
                                  key={campaignIndex}
                                  className="card h-100 campaignHomeCard d-flex flex-column"
                                >
                                  <div className="card-body text-white ">
                                    <img
                                      src={`https://ipfs.moralis.io:2053/ipfs/${campaign.image}`}
                                      alt="productImage"
                                      className="w-100 "
                                      style={{ objectFit: "cover" }}
                                    />
                                    <p className="card-title mt-3">
                                      {campaign.name}
                                    </p>
                                    {/* {console.log(campaign.minimumLevel)} */}
                                    <p className="card-text">
                                      MinimumLevel: {campaign.minimumLevel}
                                    </p>
                                    <p className="card-text">
                                      {campaign.description}
                                    </p>
                                  </div>
                                  <div
                                    class
                                    Name="card-footer d-flex align-items-center justify-content-left"
                                  >
                                    <button className="footerButton1 me-2 pb-1">
                                      {ethers.formatEther(campaign.tokenReward)}{" "}
                                      <small>Eth</small>
                                    </button>
                                    <button className="footerButton2 pb-1">
                                      {campaign.points} <small>pts</small>
                                    </button>
                                  </div>

                                  <div
                                    className={`status-bar-inner d-flex justify-content-center align-items-center text-center  text-white fw-bold ${getCampaignStatus(
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
                              </Link>
                            );
                          })}
                        </div>
                      ));
                    }
                    console.log(campaign);
                    return (
                      <Link
                        to={`/campaign/${campaign.id}`}
                        state={{ accumulatedData }}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          key={campaignIndex}
                          className="card h-100 campaignHomeCard d-flex flex-column"
                        >
                          <div className="card-body text-white ">
                            <img
                              src={`https://ipfs.moralis.io:2053/ipfs/${campaign.image}`}
                              alt="productImage"
                              className="w-100 "
                              style={{ objectFit: "cover" }}
                            />
                            <p className="card-title mt-3">{campaign.name}</p>
                            {console.log(campaign.minimumLevel)}
                            <p className="card-text">
                              MinimumLevel: {campaign.minimumLevel}
                            </p>
                            <p className="card-text">{campaign.description}</p>
                          </div>
                          <div
                            class
                            Name="card-footer d-flex align-items-center justify-content-left"
                          >
                            <button className="footerButton1 me-2 pb-1">
                              {ethers.formatEther(campaign.tokenReward)}{" "}
                              <small>Eth</small>
                            </button>
                            <button className="footerButton2 pb-1">
                              {campaign.points} <small>pts</small>
                            </button>
                          </div>

                          <div
                            className={`status-bar-inner d-flex justify-content-center align-items-center text-center  text-white fw-bold ${getCampaignStatus(
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
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
