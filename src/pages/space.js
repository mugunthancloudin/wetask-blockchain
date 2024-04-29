import React from "react";
import MyNavbar from "../components/navbar & footer/navbar/navbar";
import UnderConstruction from "../components/underContruction/underConstruction";
import Footer from "../components/navbar & footer/footer/footer";

import SpaceCreate from "../components/create/space/space";

import { Log } from "ethers";
import SpaceHome from "../components/space/spaceHome";
import SpaceDetails from "../components/space/spaceDetails";
export default function Space() {

  // if(isSuccess&& spaceData[0]){
  //   let resultCampaignData = [];
  //   let resultEventData = [];
  //   const campaignIDs = spaceData[0].campaigns.map(bigNum => bigNum.toString())
  //   const eventIDs = spaceData[0].events.map(bigNum => bigNum.toString())
  //   SpaceCampaigns(campaignIDs).pages[0].forEach(item => {resultCampaignData.push(item.result)})
  //   SpaceEvents(eventIDs).pages[0].forEach(item => {resultEventData.push(item.result)});
  //   console.log("Space Campaigns :",resultCampaignData);
  //   console.log("Space Events:",resultEventData);
  // }

  return (
    <>
      <MyNavbar />
      <SpaceHome/>
      {/* <SpaceDetails/> */}
      {/* <div className="container-fluid campaignMainBg">
        <div className="container">
          <div className="row pt-5">
            {accumulatedData.map((item, index) => (
              
              <div className="col-lg-4">
                <h1></h1>
              <div className="card" key={index}>
                  <img
                    src={`https://ipfs.moralis.io:2053/ipfs/${item.image}`}
                    alt="productImage"
                    className="mappingCardImg"
                    // style={{ objectFit: "contain" }}
                  />
                  <h1>{item.name}</h1>
                </div>
                </div>
            ))}

          </div>
        </div>
      </div> */}

      {/* <h1>Space</h1>
      <div>
\        {accumulatedData.map((spaceData, index) => (
          <div key={index}>
            <h2>Space ID: {index + 1}</h2>
            <h3>
              Campaigns :
              {campaignID[index] &&
                campaignID[index].map((campaign, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSpaceCID(campaign.toString())}
                  >
                    {campaign.toString()}
                  </button>
                ))}
            </h3>
            <h3>
              Events :
              {eventID[index] &&
                eventID[index].map((event, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSpaceEID(event.toString())}
                  >
                    {event.toString()}
                  </button>
                ))}
            </h3>
          </div>
        ))}
        <div>
          <h2>Space Campaign Details:</h2>
          {CampaignDetails && (
            <pre>{JSON.stringify(CampaignDetails, null, 2)}</pre>
          )}
        </div>

        <div>
          <h2>Space Event Details:</h2>
          {EventDetails && <pre>{JSON.stringify(EventDetails, null, 2)}</pre>}
        </div>
      </div> */}
      <Footer />
    </>
  );
}
