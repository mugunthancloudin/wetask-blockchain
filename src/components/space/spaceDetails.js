import React, { useState, useEffect } from "react";
import "./spaceMain.css";
import MyNavbar from "../navbar & footer/navbar/navbar";
import Footer from "../navbar & footer/footer/footer";
import { useLocation } from "react-router";

export default function SpaceDetails() {
  const location = useLocation();
  const { accumulatedData } = location?.state || {};
  console.log(accumulatedData);

  const [eventDetail, setEventDetail] = useState(null);
  const spaceIndex = parseInt(window.location.pathname.split("/")[2], 10);
  console.log(spaceIndex);

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

  console.log(eventDetail);

  return (
    <>
      <MyNavbar />
      <div className="container-fluid text-white campaignMainBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 ">
              <h1>hs</h1>
            </div>
            <div className="col-lg-6  d-flex justify-content-end">
              <button>Follow</button>
              <button className="ms-5">Share</button>
            </div>
          </div>
        </div>

        <div className="row mt-5 p-5">
          <div className="col-lg-6">
            <h3>{eventDetail.name}</h3>
            <p>
              The first video game that merges console gaming with blockchain
              technology, developed by Galaxy Games. Featured on PlayStation,
              Xbox, IGN, and Steam platforms, and incubated by Seedify Fund.
              Winner of the Epic Mega Grant.
            </p>
          </div>
          <div className="col-lg-6 d-flex justify-content-between  text-center pt-5">
            <div className="col-lg-4">
            {eventDetail.campaigns.length}<br></br>campaigns
            </div>
            <div className="col-lg-4">
            {eventDetail.events.length}<br></br>events
            </div>
            <div className="col-lg-4">
              20<br></br>Partispants
            </div>
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
