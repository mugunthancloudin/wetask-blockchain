import React, { useState, useEffect } from "react";
import {
    ReadSpace,
    SpaceCampaigns,
    SpaceEvents,
    useReadCampaign,
    useReadEvent,
    GetSpaceCampaign,
  } from "../../services/blockchain";

export default function SpaceCampEventDetails() {
    const spaceId = "3";
    const { data : spaceData, isSuccess } = ReadSpace(spaceId);

    const [campaignId, setCampaignId] = useState([]);
    const [eventId, setEventId] = useState([]);  

    const { data: campaignData, isSuccess: campaignSuccess } = useReadCampaign(campaignId);
    const { data: eventData, isSuccess: eventSuccess } = useReadEvent(eventId);

    console.log(campaignData);
    console.log(eventData);

    const [campaignDatas, setCampaignDatas] = useState([]); 
    const [eventDatas, setEventDatas] = useState([]); 

    console.log("Campaign Id", spaceData[2]);
    console.log("Event Id", spaceData[3]);

    // Counter to keep track of which index to set as campaignIds
  const [cIndex, setCIndex] = useState(0);
  const [eIndex, setEIndex] = useState(0);

  // Fetch campaign details when campaignIds change
  useEffect(() => {
    if (isSuccess && spaceData[2] && cIndex <= spaceData[2].length) {
      const id = parseInt(spaceData[2][cIndex], 10);
      setCampaignId([id]);
      setCIndex((prevIndex) => prevIndex + 1);
  
      // Check if campaignData is defined and has length
      if (campaignData && campaignData.length > 0) {
        setCampaignDatas((prevDetails) => [...prevDetails, campaignData]);
      }
    }
  }, [isSuccess, spaceData, cIndex, campaignData]);

  console.log("Campaign data", campaignDatas);

  useEffect(() => {
    if (isSuccess && spaceData[3] && eIndex <= spaceData[3].length) {
      // Extracting campaign ID at cIndex from data and converting to number
      const id = parseInt(spaceData[3][eIndex], 10);
      setEventId([id]); // Set campaignIds with the current index's ID
      setEIndex((prevIndex) => prevIndex + 1); // Move to the next index for the next call

      // Update campaignDetails with campaignData[0]
      if (spaceData[3] && spaceData[3].length > 0) {
        // setCampaignDetails((prevDetails) => [...prevDetails, campaignData[0]]);
        setEventDatas((prevDetails) => [...prevDetails, eventData]);
      }
    }
  }, [isSuccess, spaceData, eIndex, eventData]);

//   console.log("loop CID", campaignId);
//   console.log("loop EID", eventId);

  console.log("Event data", eventDatas);

}