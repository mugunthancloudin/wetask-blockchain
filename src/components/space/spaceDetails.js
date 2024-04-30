import React, { useState, useEffect } from "react";
import "./spaceMain.css";
import MyNavbar from "../navbar & footer/navbar/navbar";
import Footer from "../navbar & footer/footer/footer";
import { useLocation } from "react-router";
import { useReadCampaign } from "../../services/blockchain";


export default function SpaceDetails() {
  const location = useLocation();
  const { accumulatedData } = location?.state || {};
  const [eventDetail, setEventDetail] = useState(null);
  const spaceIndex = parseInt(window.location.pathname.split("/")[2], 10);

const camaignId = 

//   const { data, isSuccess } =  useReadCampaign(campaignId);



  useEffect(() => {
    if (accumulatedData && spaceIndex >= 0 && spaceIndex < accumulatedData.length) {
      const selectedSpace = accumulatedData[spaceIndex];
      setEventDetail(selectedSpace);
    }
  }, [spaceIndex, accumulatedData]);

  

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
                <p>   z``
                  The first video game that merges console gaming with blockchain
                  technology, developed by Galaxy Games. Featured on PlayStation,
                  Xbox, IGN, and Steam platforms, and incubated by Seedify Fund.
                  Winner of the Epic Mega Grant.
                </p>
              </>
            )}
          </div>
          <div className="col-lg-6 d-flex justify-content-be tween text-center pt-5">
            {eventDetail && (
              <>
                <div className="col-lg-4">
                  {eventDetail.campaigns.length}
                  <br />campaigns
                </div>
                <div className="col-lg-4">
                  {eventDetail.events.length}
                  <br />events
                </div>
                <div className="col-lg-4">
                  20<br />Participants
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
        </div>
      </div>
      <Footer />
    </>
  );
}
