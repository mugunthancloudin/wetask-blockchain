import React from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import { useState,useEffect } from 'react'
import { ReadSpace,SpaceCampaigns,SpaceEvents} from '../services/blockchain'
export default function Space() {

  const [spaceId, setSpaceId] = useState('1');
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [campaignID , setCampaignID] = useState([])
  const [eventID , setEventID] = useState([])
  
  const {data , isSuccess} = ReadSpace(spaceId)
  useEffect(() => {
        if (isSuccess && data[0].name) {
          setAccumulatedData((currentData) => [...currentData, data[0]]);
          setCampaignID((currentData) => [...currentData, data[0].campaigns]);
          setEventID((currentData) => [...currentData, data[0].events]);
          setSpaceId((currentId) => String(Number(currentId) + 1));
        }
      } , [data, isSuccess, spaceId, accumulatedData]); // Ensure all relevant variables are included in dependency array

      console.log("All Space Data" , accumulatedData);
  
    const sampleId = "1"
    const {data:spaceData} = ReadSpace(sampleId)

      if(isSuccess&& spaceData[0]){
        const campaignIDs = spaceData[0].campaigns.map(bigNum => bigNum.toString())
        const eventIDs = spaceData[0].events.map(bigNum => bigNum.toString())
        console.log("Space Campaigns :",SpaceCampaigns(campaignIDs));
        console.log("Space Events :",SpaceEvents(eventIDs));
      }
  
  return (
    <>
      <MyNavbar/>
      <UnderConstruction/>
      <Footer/>
    </>
  )
}
