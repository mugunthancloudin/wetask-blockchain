import React , {useState, useEffect}from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import EventCampaign from "../components/create/event/eventModule/eventCampaign.js"
import {GetAllEvents, useReadEvent} from "../services/blockchain.js"
import { useAccount } from 'wagmi'
import Eventhome from '../components/event/eventhome.js'
export default function Event() {
  const [eventId, setEventId] = useState("1");
  const [accumulatedData, setAccumulatedData] = useState([]);

  const { data, isSuccess } =  useReadEvent(eventId);

  // Log accumulatedData for debugging
  console.log("EventData:", accumulatedData);

  useEffect(() => {
    if (isSuccess) {
      setAccumulatedData((currentData) => [...currentData, data[0]]);
      setEventId((currentId) => String(Number(currentId) + 1));
    }
  }, [data, isSuccess, eventId, accumulatedData]);

  return (
    <>
    
      <MyNavbar/>
      <Eventhome/>
      {/* <UnderConstruction/> */}
      {/* <EventCampaign /> */}
      <Footer/>
    </>
  )
}
