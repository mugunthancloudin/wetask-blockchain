import React from 'react'
import {GetCampaignsByCreator} from "../../../../services/blockchain"

export default function EventCampaign() {
  const data  = GetCampaignsByCreator();
  console.log(data);
  return (
    <div>
      <h1>campaign</h1>
    </div>
    
  )
}
