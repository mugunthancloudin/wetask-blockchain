import React, { useState, useEffect } from "react";
import {
  useGetCampaignsByCreator,
  useReadCampaign,
} from "../../../../services/blockchain";
import { useFormContext } from "./formprovider";
import { CiCirclePlus } from "react-icons/ci";
import { TbReload } from "react-icons/tb";
import "./eventModule.css";
import reload from "../../../assets/event/reload.png";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
require("react-dom");

export default function EventCampaign() {
  const { address, isConnected } = useAccount();
  const { data, isSuccess } = useGetCampaignsByCreator(address);
  const initialCampaignIdState = isSuccess ? data : null;
  const [campaignId, setCampaignId] = useState(initialCampaignIdState); // Initialize campaignId state with data array
  console.log(campaignId, initialCampaignIdState);
  const fetchCampaignDetails = useReadCampaign(campaignId ? String(campaignId[0]) : null);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minCampaigns, setMinCampaigns] = useState(0); // State to hold minimum number of campaigns
  const { updateFormData } = useFormContext();
  const navigate = useNavigate();
  console.log(updateFormData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data && data !== undefined && campaignId.length > 0) {
          setCampaignDetails((prevData) => [
            ...prevData,
            fetchCampaignDetails.data[0],
          ]);
          setCampaignId((prevIds) => prevIds.slice(1));
        }
        if(initialCampaignIdState && campaignId.length > 0 ){
        setCampaignDetails(prevData => [...prevData, fetchCampaignDetails.data[0]]);
        setCampaignId(prevIds => prevIds.slice(1));        
        } 
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    fetchData();
  }, [campaignId, fetchCampaignDetails, data, address,initialCampaignIdState]);

  console.log("campaign details:", campaignDetails);

  useEffect(() => {
    if (data === undefined) {
      console.log("No campaigns found");
    }
  }, [data]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Selected Campaign IDs:", selectedCampaignIds);
    // console.log("Minimum Number of Campaigns:", minCampaigns);
    try {
      const submittedData = {
        selectedCampaignIds,
        minCampaigns,
      };
      alert("Submitted Data: " + JSON.stringify(submittedData, null, 2));
      updateFormData(submittedData);
      navigate(`/event/eventrewards`);
    } catch (error) {
      console.error("Error in onSubmitOfCampaignDetails:", error);
    }

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-12">
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
                      To be added to an event, campaign(s) must meet the
                      following requirements
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
                  <h3 className="text-center">TEest dao(1)</h3>

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
              <input
                type="number"
                className="form-control mb-5"
                value={minCampaigns}
                onChange={(e) => setMinCampaigns(e.target.value)}
              />

              <div className="buttons my-4 ">
                <button className="save-draft text-nowrap">
                  Save as Draft
                </button>
                <button className="save-draft ms-3">Previous</button>
                <button className="next" type="submit">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
