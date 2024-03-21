import React from "react";
import { GetCampaignsByCreator, ReadCampaign } from "../../../../services/blockchain";
import "./eventModule.css";
import reload from "../../../assets/event/reload.png";

export default function EventCampaign() {
  const data  = GetCampaignsByCreator();
  console.log(data.data);
  const campaignInfo = ReadCampaign();
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
