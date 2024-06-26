import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./campaignDetails.css";
import { FaSquareXTwitter, FaGlobe } from "react-icons/fa6";
import { TbBrandDiscord } from "react-icons/tb";
import { FaCopy } from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";
import mainpic from "../assets/campaign/dragonballzzzz.png";
import rewardsLogo from "../assets/campaign/rewards.png";
import polygon from "../assets/campaign/Polygon.png";
import campigners from "../assets/campaign/campaigners.png";
import twitter from "../assets/campaign/twitter.svg";
import calender from "../assets/campaign/calender.png";
import Footer from "../navbar & footer/footer/footer";
import MyNavbar from "../navbar & footer/navbar/navbar";
import {
  JoinCampaign,
  ViewCampaignParticipants,
} from "../../services/blockchain";

const CampaignDetails = () => {
  const location = useLocation();
  const { accumulatedData } = location?.state || {};
  console.log(accumulatedData);
  const [tasksData, setTasksData] = useState(null);
  const [campaignDetail, setCampaignDetail] = useState("");
  console.log(campaignDetail);
  const [isCopied, setIsCopied] = useState(false);

  const addressRef = useRef(null);
  const campaignId = window.location.pathname.split("/")[2];
  const [clickedLinks, setClickedLinks] = useState([]);
  console.log(clickedLinks);

  const handleLinkClick = (index) => {
    setClickedLinks((prevClickedLinks) => {
      const newClickedLinks = [...prevClickedLinks];
      newClickedLinks[index] = !newClickedLinks[index];
      return newClickedLinks;
    });
  };

  useEffect(() => {
    const campaignDetails = accumulatedData
    console.log(campaignDetails);
    setCampaignDetail(campaignDetails);

    if (campaignDetails && campaignDetails.tasksURL) {
      const timeoutId = setTimeout(() => {
        fetch(`https://ipfs.moralis.io:2053/ipfs/${campaignDetails.tasksURL}`)
          .then((response) => response.json())
          .then((data) => {
            // Transform tasks data
            const transformedData = data.map((task) => {
              if (task.taskTitle === "Post") {
                const tweetId = task.value.match(/\/(\d+)$/)[1];
                task.value = `https://twitter.com/intent/retweet?tweet_id=${tweetId}`;
              } else if (task.taskTitle === "Follow") {
                const username = task.value.match(/\/(\w+)$/)[1];
                task.value = `https://twitter.com/intent/follow?screen_name=${username}`;
              } else if (task.taskTitle === "Like") {
                const tweetId = task.value.match(/\/(\d+)$/)[1];
                task.value = `https://twitter.com/intent/like?tweet_id=${tweetId}`;
              }
              return task;
            });
            setTasksData(transformedData);

            // Set initial state for clickedLinks when tasksData is available
            setClickedLinks(new Array(transformedData.length).fill(false));
          })
          .catch((error) => {
            console.error("Error fetching tasks data:", error);
          });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [campaignId, accumulatedData]);

  const { data } = ViewCampaignParticipants(campaignId);

  let campaignStart = Number(campaignDetail?.startTimestamp);
  console.log(campaignStart);
  let campaignEnd = Number(campaignDetail?.endTimestamp);
  console.log(campaignEnd);
  let contractAddress = campaignDetail?.creator;

  const startDate = new Date(campaignStart);
  const endDate = new Date(campaignEnd + 7 * 24 * 60 * 60 * 1000);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedStartDate = startDate.toLocaleString("en-US", options);
  const formattedEndDate = endDate.toLocaleString("en-US", options);
  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate} (GMT+05:30)`;
  console.log(formattedDateRange);

  const handleCopyClick = () => {
    const contractAddress = campaignDetail?.creator;

    if (contractAddress) {
      const formattedAddress = `https://polygonscan.com/address/${contractAddress}`;
      navigator.clipboard.writeText(formattedAddress).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <>
      {/* <ViewCampaignParticipants campaignId={campaignId}/> */}
      <MyNavbar />
      <div className="container-fluid detailsmainBg">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="card detailsCardBg">
                <img
                  src={`https://ipfs.moralis.io:2053/ipfs/${campaignDetail.image}`}
                  alt="productImage"
                  className="w-100 justify-content-center"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-7 text-white">
              <div className="row">
                <h1 className="mt-5">
                  Your NFT Brawlers, Earn $BLITZ! STAKE AND EARN!
                </h1>
                <p>
                  <img
                    src={calender}
                    alt="calender"
                    style={{ width: "25px", height: "25px" }}
                    className="me9-2"
                  />
                  {formattedDateRange}
                </p>
              </div>
              <hr></hr>

              <div className="row  text-white">
                <div className="col-lg-4">
                  <h5>{campaignDetail.name}</h5>
                </div>

                <div className="col-lg-4">&nbsp;</div>
                <div className="col-lg-4 d-flex justify-content-around align-items-center">
                  <FaSquareXTwitter className="socialIcon" />
                  <TbBrandDiscord className="socialIcon" />
                  <FaGlobe className="socialIcon" />
                </div>

                <div className="contractAddress mt-2">
                  {contractAddress && (
                    <span>
                      {contractAddress.slice(0, 6)}....
                      {contractAddress.slice(-4)}
                    </span>
                  )}

                  <button
                    onClick={handleCopyClick}
                    className=" ms-2 contractAddressBtn"
                  >
                    {isCopied ? "Copied" : <FaCopy />}
                  </button>
                </div>

                <p className="mt-2">
                  Greetings, esteemed BlitzBrawler NFT community! We bring you
                  thrilling updates on your prized NFTs, with a special nod to
                  the fortunate first owners. The NFT prices have undergone an
                  update, and as always, the pioneers in ownership are in for a
                  stroke of luck!
                </p>
              </div>
              <div className="row p-1 mb-3 d-flex rewardsBg">
                <div className="col-lg-6 m-2">
                  <div className="row align-items-center">
                    <div className="col-lg-12 d-flex">
                      <img
                        src={rewardsLogo}
                        alt="rewards"
                        className="rewardsLogo"
                      />
                      <div className="d-flex justify-content-start">
                        Reward :{" "}
                        <span className="rewardCount">
                          {" "}
                          {campaignDetail?.tokenReward}
                        </span>{" "}
                        / {campaignDetail?.points}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 ms-5 d-flex">
                    Rewards on :{" "}
                    <button className="detailsBtn">
                      <img
                        src={polygon}
                        alt="polygon"
                        className="coinLogo me-2"
                      />{" "}
                      Polygon
                    </button>
                  </div>

                  <div className="row mt-3 ms-5 d-flex align-items-center justify-content-left">
                    <button className="detailbtn1 me-2">SBT</button>
                    <button className="detailbtn2 me-2">Giveaway</button>
                    <button className="detailbtn3">2 XP</button>
                  </div>
                </div>

                <div className="col-lg-6"></div>
              </div>

              <div className="row p-2 mb-3 py-3 rewardsBg">
                <div>
                  <img
                    src={campigners}
                    alt="campaigners"
                    className="campignerimg me-3"
                  />
                  campaigners
                </div>
              </div>

              <div className="row mb-3">
                {tasksData && tasksData.length > 0 && (
                  <Accordion className="" defaultActiveKey="0">
                    {tasksData.map((task, index) => (
                      <Accordion.Item
                        className="accordionColor"
                        key={index}
                        eventKey={index.toString()}
                      >
                        <Accordion.Header>
                          <img src={twitter} alt="twitter" className="me-2" />
                          {`Task ${index + 1}: ${task.taskTitle}`} In Twitter
                        </Accordion.Header>

                        <Accordion.Body className="accordionColor">
                          <p>{task.description}</p>
                          <div className="row justify-content-end">
                            <button
                              className="followTwitter me-2"
                              // onClick={() => handleLinkClick(index)}
                            >
                              <img src={twitter} alt="twitter" /> Bind
                            </button>
                            <button
                              className="followTwitter"
                              onClick={() => handleLinkClick(index)}
                            >
                              <a
                                href={task.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-white ${
                                  clickedLinks[index] ? "active" : "disabled"
                                }`}
                              >
                                {task.taskTitle}
                              </a>
                            </button>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                )}

                <div className="mt-3">
                  <JoinCampaign campaignId={campaignId} />
                </div>

                <div className="row my-3 p-3 rewardsBg">
                  <h2>Participant Addresses</h2>
                  <div className="participant-addresses">
                    {data &&
                      data.map((address, index) => (
                        <div key={index}>{address}</div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignDetails;
