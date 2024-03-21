import React from 'react'
import {GetCampaignsByCreator, ReadCampaign} from "../../../../services/blockchain"

export default function EventCampaign() {
  const data  = GetCampaignsByCreator();
  console.log(data.data);
  const campaignInfo = ReadCampaign();
  return (
    <div>
      <h1>campaign</h1>
    </div>
    
  )
}
