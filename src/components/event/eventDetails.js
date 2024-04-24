import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import eventImg from "../assets/event/eventbg.webp";
import MyNavbar from "../navbar & footer/navbar/navbar.js";
import Footer from "../navbar & footer/footer/footer.js";
import EventHomeCampaign from "./eventHomeCampaign.js";

export default function EventDetails() {
  const location = useLocation();
  const { accumulatedData } = location?.state || {};
  const [eventDetail, setEventDetail] = useState("");
  const campaignId = window.location.pathname.split("/")[2];
  

  useEffect(() => {
    const campaignDetails = accumulatedData?.find(
      (item) => item.id === campaignId
    );
    setEventDetail(campaignDetails || []);
  }, [campaignId, accumulatedData]);


  console.log(eventDetail);
  // console.log(eventDetail.campaignIds.length );

  //   const ipfsBaseUrl = "https://ipfs.io/ipfs/";
  // const eventImg = ipfsBaseUrl + eventDetail.image;

  const currentTimestamp = Date.now();
  const endTimestamp = parseInt(eventDetail.endTimestamp) * 1000;
  let differenceInMs = endTimestamp - currentTimestamp;
  let differenceInDays;
  
  if (differenceInMs < 0) {
    differenceInMs = 0;
    differenceInDays = 0;
  } else {
    differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  }
  

console.log("Difference in days:", differenceInDays);

  return (
    <>
      <MyNavbar />
      <div className="container-fluid eventDetails">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 p-5">
              {/* <img src={eventImg} alt="eventImg" className="w-100" /> */}
              <img
                      src={`https://ipfs.moralis.io:2053/ipfs/${eventDetail.image}`}
                      alt="productImage"
                      className="w-100 h-50 justify-content-center"
                      style={{ objectFit: "cover" }}
                    />
              <p className="mt-5">
                We've hit a monumental milestone! Congratulations to all our
                explorers; we now have our first habitat outside of Earth! Our
                explorers have successfully settled on the moon, and now it's
                time to celebrate!
              </p>{" "}
              <p>
                We're announcing this meteor shower of a giveaway series with
                our special partners in celebration!
              </p>{" "}
              {/* <p>
                {" "}
                Extra thanks to Hot Knife Studios for contributing to the Event
                reward, which will be distributed additionally across the
                participants!
              </p>{" "}
              <p>
                This is the first milestone of many, and we're thrilled to share
                this celebration! Let's chase those rewards and enjoy them as we
                embark further on our journey!
              </p> */}
            </div>
            <div className="col-lg-5 p-3">
              <div className="row text-center">
                <h5>Event Ends In {differenceInDays} Days</h5>
                {/* <h6>(UTC+5) 2024-04-11 18:32 ～ 04-29 03:30</h6> */}
                <h6>
                  (UTC + 5){" "}
                  {new Date(
                    parseInt(eventDetail.startTimestamp) * 1000
                  ).toLocaleString()}{" "}
                  ~{" "}
                  {new Date(
                    parseInt(eventDetail.endTimestamp) * 1000
                  ).toLocaleString()}
                </h6>
              </div>

              <div className="row">
                <h3>Lucky Draw</h3>
                <div className="card">
                  <div className="row eventDetailsTOken">
                    <div className="col-lg-6">
                      <h3>Token</h3>
                    </div>
                    <div className="col-lg-6 text-end">
                      <h3>
                        <span className="eventSpanCode">2</span> USDT/winner
                      </h3>
                      <h6>50 Winners</h6>
                    </div>
                  </div>
                </div>

                {/* <div className="card mt-3"> */}
                <div className="row eventDetailsTOken mt-3">
                  <div className="col-lg-6">
                    <h3>Token</h3>
                  </div>
                  <div className="col-lg-6 text-end">
                    <h3>
                      <span className="eventSpanCode">3</span> USDT/winner
                    </h3>
                    <h6>39 Winners</h6>
                  </div>
                </div>
                {/* </div> */}
              </div>

              <div className="row mt-4">
                <h4>Open to All</h4>
                <div className="eventDetailsTOken mt-2">
                  <div className="row">
                    <div className="col-lg-6">
                      <h3>Points</h3>
                    </div>
                    <div className="col-lg-6 text-end mt-2">
                      <h4>
                        <span className="eventSpanCode">400</span> Points/winner
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4 d-flex">
                <div className="col-lg-4">Host/Cohost</div>
                <div className="col-lg-4">THE CORE</div>
                <div className="col-lg-4">
                  <button className="eventDetailsBtn">+ Follow</button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3>Campaign List</h3>
            {eventDetail.campaignIds && (
              <div className="row d-flex justify-content-center mt-3">
                <div className="col-lg-4 text-center">
                  <p>{eventDetail.campaignIds.length}</p>
                  <h6 className="campaignFont">Total Campaigns</h6>
                </div>
                <div className="col-lg-4 text-center">
                  <p>0</p>
                  <h6 className="campaignFont">Required to Complete</h6>
                </div>
                <div className="col-lg-4 text-center">
                  <p>0</p>
                  <h6 className="campaignFont">You Complete</h6>
                </div>
              </div>
            )}
          </div>
        </div>

        <EventHomeCampaign campaignId={campaignId} />
      </div>
      <Footer />

    </>
  );
}
