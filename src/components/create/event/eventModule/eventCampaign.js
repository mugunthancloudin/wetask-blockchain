import React, { useState, useEffect } from "react";
import {
  useGetCampaignsByCreator,
  useReadCampaign,
} from "../../../../services/blockchain";
import { CiCirclePlus } from "react-icons/ci";
import { TbReload } from "react-icons/tb";
import "./eventModule.css";
import reload from "../../../assets/event/reload.png";
import { useAccount } from "wagmi";
require("react-dom");

export default function EventCampaign() {
  const { address } = useAccount();
  const { data } = useGetCampaignsByCreator(address);
  const initialCampaignIdState = data ? data[0] : null;
  const [campaignId, setCampaignId] = useState(initialCampaignIdState); // Initialize campaignId state with data array
  console.log(campaignId, data);
  const fetchCampaignDetails = useReadCampaign(campaignId ? String(campaignId[0]) : null);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState([]);
  const [loading, setLoading] = useState(true);

  if (data === undefined || null) {
    console.log("Connect wallet/No campaign available");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(fetchCampaignDetails && campaignId.length > 0 ){
        setCampaignDetails(prevData => [...prevData, fetchCampaignDetails.data[0]]);
        setCampaignId(prevIds => prevIds.slice(1));        
        } 
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    fetchData();
  }, [campaignId, fetchCampaignDetails, data, address]);

  console.log("campaign details:", campaignDetails);

  const handleReload = () => {
    window.location.reload();
  };

  const handleCheckboxChange = (campaignId) => {
    setSelectedCampaignIds((prevIds) =>
      prevIds.includes(campaignId)
        ? prevIds.filter((id) => id !== campaignId)
        : [...prevIds, campaignId]
    );
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            {campaignDetails.length === 0 ? (
              <div className="card eventCard">
                <div className="text-center p-3">
                  <div>You don’t have upcoming/ongoing campaigns</div>
                  <div>
                    Please
                    <a
                      href="/camp/basicinfo"
                      className="no-campaign__link mx-2"
                      target="_blank"
                    >
                      create campaign
                    </a>
                    first
                  </div>
                  <div
                    className="d-flex justify-content-center"
                    role="button"
                    tabIndex="0"
                    onClick={handleReload}
                  >
                    <img
                      src={reload}
                      alt="reload"
                      className="me-2 mt-1"
                      width="15px"
                      height="15px"
                    />
                    <div className="link-button__label">Refresh</div>
                  </div>
                </div>
                <hr className="hrLine"></hr>
                <div className="disabled-tip  p-2">
                  <div className="disabled-tip__title">
                    To be added to an event, campaign(s) must meet the following
                    requirements
                  </div>
                  <div className="disabled-tip__line">
                    · public and not added to other events
                  </div>
                  <div className="disabled-tip__line">
                    · active(upcoming/ongoing) and ongoing for a certain
                    duration within the event period
                  </div>
                  <div className="disabled-tip__line">
                    · with tasks rewarded with points if the event winners are
                    selected based on point ranking
                  </div>
                </div>
              </div>
            ) : (
              <div className="card eventCards mt-3">
                <h3 className="text-center">Campaigns(1)</h3>

                {campaignDetails.map((item, index) => (
                <div
                  className="eventInnerDiv p-4 d-flex justify-content-center"
                  key={index}
                >
                  <div className="col-lg-1">
                    <input
                      type="checkbox"
                      checked={selectedCampaignIds.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </div>
                  <div className="col-lg-7 text-start">
                    {item.name}
                    <br />
                    (UTC+5)
                    {new Date(Number(item.startTimestamp)).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "2-digit",
                          day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                    ~
                    {new Date(Number(item.endTimestamp)).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </div>
                  <div className="col-lg-4 text-center">
                    <button className="fs-6">Upcoming</button>
                  </div>
                </div>
              ))}

                <div className="mt-4 d-flex justify-content-end">
                  <div className="col-lg-6">&nbsp;</div>
                  <div className="col-lg-6 d-flex">
                    <div className="col-lg-6 text-center">
                      <a
                        href="/camp/basicinfo"
                        className="no-campaign__link mx-2 d-flex"
                        target="_blank"
                      >
                        <CiCirclePlus className="me-2 mt-1" />
                        <h6>Create Campaign</h6>
                      </a>
                    </div>
                    <div
                      className="col-lg-6 d-flex text-center"
                      onClick={handleReload}
                    >
                      <TbReload className="me-2 mt-1" />
                      <h6>Refresh</h6>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button className="w-100 mt-3 eventBtn">
              + Invite cohost to add campaign
            </button>

            <p className="mt-3">
              Min Number Of Campaigns That Must Be Completed{" "}
            </p> 
            <input type="number" className="form-control mb-5" />

            <div className="buttons my-4 ">
              <button className="save-draft text-nowrap">Save as Draft</button>
              <button className="save-draft ms-3">Previous</button>
              <button className="next" type="submit">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
  