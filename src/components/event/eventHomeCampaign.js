import React, { useState, useEffect } from 'react';
import { useReadEvent, useReadCampaign } from "../../services/blockchain.js";

export default function EventHomeCampaign() {
  const eventId = "1";
  const { data, isSuccess } = useReadEvent(eventId);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [campaignIds, setCampaignIds] = useState([]);

  const { data: campaignData, isSuccess: campaignSuccess } = useReadCampaign(campaignIds);

  // Counter to keep track of which index to set as campaignIds
  const [indexToSet, setIndexToSet] = useState(0);

  // Fetch campaign details when campaignIds change
  useEffect(() => {
    if (isSuccess && data[1] && indexToSet <= data[1].length) {
      // Extracting campaign ID at indexToSet from data and converting to number
      const id = parseInt(data[1][indexToSet], 10);
      setCampaignIds([id]); // Set campaignIds with the current index's ID
      setIndexToSet(prevIndex => prevIndex + 1); // Move to the next index for the next call
      
      // Update campaignDetails with campaignData[0]
      if (campaignData && campaignData.length > 0) {
        setCampaignDetails(prevDetails => [...prevDetails, campaignData[0]]);
      }
    }
  }, [isSuccess, data, indexToSet, campaignData]);

  // Log campaign details
  console.log(campaignDetails);

  return null; // Replace with your JSX for rendering
}
