import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CampaignDetails = ({ accumulatedData }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [campaignDetails, setCampaignDetails] = useState(null);

  useEffect(() => {
    console.log("accumulatedData:", accumulatedData);
    console.log("id:", id);

    if (accumulatedData && accumulatedData.length > 0) {
      const foundCampaign = accumulatedData.find(item => item.id === id);
      console.log("foundCampaign:", foundCampaign);

      if (foundCampaign) {
        setCampaignDetails(foundCampaign);
        setLoading(false);
      }
    }
  }, [accumulatedData, id]);

  if (loading) {
    return <div>{id} Loading...</div>;
  }

  if (!campaignDetails) {
    return <div>Campaign not found.</div>;
  }

  return (
    <div>
      <h2>{campaignDetails.name}</h2>
      <p>Description: {campaignDetails.description}</p>
      <p>Start Timestamp: {campaignDetails.startTimestamp}</p>
      <p>End Timestamp: {campaignDetails.endTimestamp}</p>
    </div>
  );
};

export default CampaignDetails;