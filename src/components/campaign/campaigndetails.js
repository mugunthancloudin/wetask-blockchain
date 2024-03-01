// CampaignDetails.js

import React from "react";
import { useLocation } from "react-router-dom";

const CampaignDetails = () => {
  const location = useLocation();
  const { accumulatedData } = location?.state || {};
  
  // Extract the campaign ID from the URL
  const campaignId = window.location.pathname.split("/")[2];

  // Find the campaign details based on the ID
  const campaignDetails = accumulatedData?.find((item) => item.id === campaignId);

  // Logging for debugging
  console.log("accumulatedData:", accumulatedData);
  console.log("campaignId:", campaignId);
  console.log("campaignDetails:", campaignDetails);

  // Render the campaign details
  return (
    <div>
      <h2>Campaign Details</h2>
      {campaignDetails ? (
        <>
          <p>ID: {campaignDetails.id}</p>
          <p>Name: {campaignDetails.name}</p>
          {/* Add other details as needed */}
        </>
      ) : (
        <p>Campaign not found.</p>
      )}
    </div>
  );
};

export default CampaignDetails;