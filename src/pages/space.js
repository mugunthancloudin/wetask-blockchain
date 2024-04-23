import React from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import { useState,useEffect } from 'react'
import { ReadSpace,SpaceCampaigns,SpaceEvents, useReadCampaign, useReadEvent} from '../services/blockchain'
import { Log } from 'ethers'
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
  
    const [spaceEId , setSpaceEID] = useState("")
    const [EventDetails , setEventDetails] = useState(null)
    console.log(spaceEId);

    const {data : spaceEvent} = useReadEvent(spaceEId);
    useEffect (() => {
      if(spaceEvent){
        setEventDetails(spaceEvent[0])
      }
    })

    console.log(EventDetails);
    // if(isSuccess&& spaceData[0]){
    //   let resultCampaignData = [];
    //   let resultEventData = [];
    //   const campaignIDs = spaceData[0].campaigns.map(bigNum => bigNum.toString())
    //   const eventIDs = spaceData[0].events.map(bigNum => bigNum.toString())
    //   SpaceCampaigns(campaignIDs).pages[0].forEach(item => {resultCampaignData.push(item.result)})
    //   SpaceEvents(eventIDs).pages[0].forEach(item => {resultEventData.push(item.result)});
    //   console.log("Space Campaigns :",resultCampaignData);
    //   console.log("Space Events:",resultEventData);
    // }
    
  return (
    <>
      <MyNavbar/>
        <h1>Space</h1>
        <div>
        {/* Map over accumulatedData and render each item */}
        {accumulatedData.map((spaceData, index) => (
          <div key={index}>
            <h2>Space ID: {index + 1}</h2>
            <h3>Campaigns :
            {campaignID[index] && campaignID[index].map((campaign, idx) => (
              <button key={idx} onClick={{}}>
                {campaign.toString()}
              </button>
            ))}</h3>
            <h3>Events :
            {eventID[index] && eventID[index].map((event, idx) => (
              <button key={idx} onClick={()=> setSpaceEID(event.toString())}>
                {event.toString()}
              </button>
            ))}</h3>
          </div>
        ))}
        {EventDetails && (
          <div>
            <h2>Event Details</h2>
            <p>Event ID: {EventDetails.id}</p>
            {/* Render other details as needed */}
          </div>
        )}
      </div>
      <Footer/>
    </>
  )
}
