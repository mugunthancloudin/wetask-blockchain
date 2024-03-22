import React, {useState,useEffect} from "react";
import { GetCampaignsByCreator, ReadCampaign } from "../../../../services/blockchain";
import "./eventModule.css";
import reload from "../../../assets/event/reload.png";

export default function EventCampaign() {

  const {data} = GetCampaignsByCreator();
  
  console.log(data);
  const data1 = ReadCampaign(String(data[0]));
  console.log(data1)
  // const [accumulatedData, setAccumulatedData] = useState([]);
  // const formattedData = ['2', '3', '4', '5']; // Hardcoded array
  // const [n, setN] = useState(formattedData[0]); // Start index from '2'

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (parseInt(n) <= parseInt(formattedData[formattedData.length - 1])) {
  //         const { data, isSuccess } = await ReadCampaign(n);
  //         if (isSuccess) {
  //           setAccumulatedData(prevData => [...prevData, data]);
  //           setN(String(Number(n) + 1)); // Increment index after fetching
  //         } else {
  //           console.log("Error fetching data for index:", n);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   })();
  // }, [n, formattedData]); // Include formattedData in the dependency array

  // // Log accumulatedData for debugging
  // console.log("accumulatedData:", accumulatedData);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="card eventCard">
              <div className="text-center p-3">
                <div>You don’t have upcoming/ongoing campaigns</div>
                <div>
                  {/* {renderCampaigns()} */}
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
