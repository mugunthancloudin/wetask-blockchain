import React, { useState, useEffect } from 'react';
import { useReadEvent, useReadCampaign } from "../../services/blockchain.js";

export default function EventHomeCampaign() {
  const eventId = "1";
  const { data, isSuccess } = useReadEvent(eventId);
  
  useEffect(() => {
    if (isSuccess && data) {
      // Extracting campaign IDs from data
      const campaignIds = data[1];
      
      // Array to store campaign details
      const campaignDetails = [];

      // Iterate over campaign IDs using map and fetch campaign details
      Promise.all(campaignIds.map(async (campaignId) => {
        const { data: campaignData, isSuccess: campaignSuccess } = await useReadCampaign(campaignId);
        
        if (campaignSuccess && campaignData) {
          // Store campaign details
          campaignDetails.push(campaignData);
        }
      })).then(() => {
        // Log campaign details
        console.log(campaignDetails);
      });
    }
  }, [isSuccess, data]);
}
