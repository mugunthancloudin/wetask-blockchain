import React , {useState, useEffect}from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import EventCampaign from "../components/create/event/eventModule/eventCampaign.js"
import {GetAllEvents, useReadEvent} from "../services/blockchain.js"
import { useAccount } from 'wagmi'
import Eventhome from '../components/event/eventhome.js'
export default function Event() {
  const { address } = useAccount();
  const { data } = GetAllEvents();
  const [eventId, setEventId] = useState(data); // Ensure data is an appropriate initial value

  const fetchEventDetails = useReadEvent(eventId ? String(eventId[0]) : null);
  const [eventDetails, setEventDetails] = useState([]);

  if (data === undefined || data === null) {
    console.log("Connect wallet/No campaign available");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fetchEventDetails && eventId && eventId.length > 0) { // Check eventId existence and length
          setEventDetails(prevData => [...prevData, fetchEventDetails.data[0]]);
          setEventId(prevIds => prevIds.slice(1));        
        } 
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      } 
    };

    if (data && data.length > 0) { // Check if data is available before fetching
      fetchData();
    }
  }, [eventId, fetchEventDetails, data, address]); // Ensure all relevant variables are included in dependency array

  console.log("campaign details:", eventDetails);

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
