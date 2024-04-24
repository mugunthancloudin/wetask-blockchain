import React, { useState, useEffect } from "react";
import {
  useGetCampaignsByCreator,
  useGetEventByCreator,
  useReadCampaign,
  useReadEvent,
} from "../../../services/blockchain";
import { useAccount } from "wagmi";
import axios from "axios";
import FormData from "form-data";
import { CreateSpace } from "../../../services/blockchain"; // Importing CreateSpace component

const categories = [
  "NFT",
  "DAO",
  "DEFI",
  "GAMEFI",
  "Wallet",
  "Exchange",
  "Community",
  "Infrastructure",
  "VC",
  "Web3",
  "KOL",
  "Metaverse",
  "Other",
];

export default function SpaceCreate() {
  const { address, isConnected } = useAccount();
  const { data: campaignData } = useGetCampaignsByCreator(address);
  const { data: eventData } = useGetEventByCreator(address);
  const [campaignId, setCampaignId] = useState(campaignData);
  const [eventId, setEventId] = useState(eventData);
  const fetchCampaignDetails = useReadCampaign(
    campaignId ? String(campaignId[0]) : null
  );
  const fetchEventDetails = useReadEvent(eventId ? String(eventId[0]) : null);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);

  const [spaceCreateData, setSpaceCreateData] = useState({
    name: "",
    image: "",
    category: 12, // Default value
    officialWebsite: "",
    discordLink: "",
    telegramLink: "",
    description: "",
    campaignIds: [],
    eventIds: [],
  });

  const [imageFile, setImageFile] = useState(null); // For storing the uploaded image file
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fetchCampaignDetails.data && campaignId.length > 0) {
          setCampaignDetails((prevData) => [
            ...prevData,
            fetchCampaignDetails.data[0],
          ]);
          setCampaignId((prevIds) => prevIds.slice(1));
        }
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }

      try {
        if (fetchEventDetails.data && eventId.length > 0) {
          setEventDetails((prevData) => [
            ...prevData,
            fetchEventDetails.data[0],
          ]);
          setEventId((prevIds) => prevIds.slice(1));
        }
      } catch (error) {
        console.error("Error fetching event details: ", error);
      }
    };

    fetchData();
  }, [
    campaignId,
    eventId,
    fetchEventDetails,
    fetchCampaignDetails,
    campaignData,
    address,
  ]);

  useEffect(() => {
    if (campaignData || eventData === undefined) {
      console.log("Fetched all Campaigns and Events");
    }
  }, [campaignData, eventData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "campaignIds" || name === "eventIds") {
      const selectedIds = [...spaceCreateData[name]];
      const id = parseInt(value);
      const index = selectedIds.indexOf(id);
      if (index === -1) {
        selectedIds.push(id);
      } else {
        selectedIds.splice(index, 1);
      }
      setSpaceCreateData((prevData) => ({
        ...prevData,
        [name]: selectedIds,
      }));
    } else if (name === "image") {
      if (files && files[0]) {
        const file = files[0];
        if (file.size > 5242880) {
          // 5MB
          alert("Maximum file size is 5 MB.");
          return;
        }
        setImageFile(file);
      }
    } else {
      setSpaceCreateData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCategorySelection = (index) => {
    setSpaceCreateData((prevData) => ({
      ...prevData,
      category: index,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      const JWT =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NWM1YzJmNC0xZGRlLTRiNWEtYTBlMi1lYTNkNjVmNWFhMjIiLCJlbWFpbCI6ImZlYXJvZmFsbGdhbWVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkNTA0MmU2ZDllNTgzYjE5MjRhYiIsInNjb3BlZEtleVNlY3JldCI6IjQ0ODAwYjQ5YWNlZmNlNzhiM2U2MjRlZmFmNzU2YjVjZDZhODJkYTk2MGM5MzdiMjQ3YWIyODNhZmUwZjBmYTYiLCJpYXQiOjE3MDA3Mzg5OTJ9.2CI_ewpLvbwj7bgxW9Iu6QnDqC2gkjyTJHtyk6DNp4U"; // Replace with your actual JWT token        
      const formData = new FormData();
      formData.append("file", imageFile);

      const pinataMetadata = JSON.stringify({
        name: `Profile Picture - ${imageFile.name}`,
      });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", pinataOptions);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      console.log("IPFS Upload Response:", response.data);
      const { IpfsHash } = response.data;
      setSpaceCreateData((prevData) => ({
        ...prevData,
        image: IpfsHash,
      }));
      console.log("Profile picture uploaded to IPFS. CID:", IpfsHash);
    } catch (error) {
      console.error("Error uploading profile picture to IPFS:", error);
    }

    console.log("Space create data:", spaceCreateData);
    setIsSubmitted(true); // Set isSubmitted to true after form submission
  };

  const displayTimeInIST = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const ISTOffset = 330 * 60 * 1000; // IST offset in milliseconds
    const ISTTime = new Date(date.getTime() + ISTOffset);
    return ISTTime.toLocaleString();
  };

  console.log("Campaign details:", campaignDetails);
  console.log("Event details:", eventDetails);
  console.log("Space create data:", spaceCreateData);

  return (
    <>
      <h1>Space Create</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={spaceCreateData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Profile Picture (Max. 5 MB):
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Category:
          <br />
          {categories.map((category, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleCategorySelection(index)}
              style={{
                background:
                  spaceCreateData.category === index ? "lightblue" : "white",
              }}
            >
              {category}
            </button>
          ))}
        </label>
        <br />
        <label>
          Official Website:
          <input
            type="text"
            name="officialWebsite"
            value={spaceCreateData.officialWebsite}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Discord Link:
          <input
            type="text"
            name="discordLink"
            value={spaceCreateData.discordLink}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Telegram Link:
          <input
            type="text"
            name="telegramLink"
            value={spaceCreateData.telegramLink}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={spaceCreateData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Campaign IDs (comma-separated):
          <br />
          {campaignDetails.map((campaign, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`campaign_${index}`}
                name={`campaignIds`}
                value={campaign.id}
                onChange={handleInputChange}
              />
              <label htmlFor={`campaign_${index}`}>
                {`ID: ${campaign.id}, Name: ${campaign.name}, Timing: ${displayTimeInIST(
                  campaign.startTimestamp
                )} - ${displayTimeInIST(campaign.endTimestamp)}`}
              </label>
            </div>
          ))}
        </label>
        <br />
        <label>
          Event IDs (comma-separated):
          <br />
          {eventDetails.map((event, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`event_${index}`}
                name={`eventIds`}
                value={event.id}
                onChange={handleInputChange}
              />
              <label htmlFor={`event_${index}`}>
                {`ID: ${event.id}, Name: ${event.name}, Timing: ${displayTimeInIST(
                  event.startTimestamp
                )} - ${displayTimeInIST(event.endTimestamp)}`}
              </label>
            </div>
          ))}
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      {/* Integration of CreateSpace component */}
      {isSubmitted && (
        <CreateSpace spaceData={spaceCreateData} />
      )}
    </>
  );
}
