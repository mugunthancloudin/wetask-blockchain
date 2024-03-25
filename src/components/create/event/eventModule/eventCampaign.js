import React, { useState, useEffect } from "react";
import {
  GetCampaignsByCreator,
  ReadCampaign,
} from "../../../../services/blockchain";
import { CiCirclePlus } from "react-icons/ci";
import { TbReload } from "react-icons/tb";
import "./eventModule.css";
import reload from "../../../assets/event/reload.png";
import { useAccount } from "wagmi";
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function EventCampaign() {
  const {address} = useAccount();
  const { data } = GetCampaignsByCreator(address);
  const [campaignId, setCampaignId] = useState(data); // Initialize campaignId state with data array
  // console.log(campaignId,address); 
  const fetchCampaignDetails = ReadCampaign(String(campaignId[0])); 
  const [campaignDetails, setCampaignDetails] = useState([]);

 // Effect to fetch campaign details and accumulate data
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (campaignId.length > 0) {
          setCampaignDetails(prevData => [...prevData, fetchCampaignDetails.data[0]]);
          setCampaignId(prevIds => prevIds.slice(1));
        }
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      } 
    };

    fetchData();
  }, [campaignId, fetchCampaignDetails]); 


  console.log("campaign details:", campaignDetails);
  
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
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
                  className=" d-flex justify-content-center"
                  role="button"
                  tabindex="0"
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
                  · active(upcoming/ongoing) and ongoing for a certain duration
                  within the event period
                </div>
                <div className="disabled-tip__line">
                  · with tasks rewarded with points if the event winners are
                  selected based on point ranking
                </div>
              </div>
            </div>

            <div className="card eventCards mt-3">
              <h3 className="text-center">test dao(1)</h3>

              <div className="eventInnerDiv p-4 d-flex justify-content-center">
                <div className="col-lg-8 text-center">df</div>
                <div className="col-lg-4 text-center">
                  <button className="fs-6">Upcomeing</button>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-end">
                <div className="col-lg-6">&nbsp;</div>
                <div className="col-lg-6 d-flex">
                  <div className="col-lg-6  text-center">
                  <a
                    href="/camp/basicinfo"
                    className="no-campaign__link mx-2 d-flex"
                    target="_blank"
                  >
                  <CiCirclePlus className="me-2 mt-1" />
                    <h6>Create Campaign</h6>
                    </a>
                  </div>
                  <div className="col-lg-6 d-flex text-center" onClick={handleReload}>
                  <TbReload  className="me-2 mt-1"/>
                    <h6>Refresh</h6>
                  </div>
                </div>
              </div>
            </div>

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
