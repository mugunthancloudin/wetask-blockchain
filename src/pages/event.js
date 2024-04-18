import React , {useState, useEffect}from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import EventCampaign from "../components/create/event/eventModule/eventCampaign.js"
import {GetAllEvents, useReadEvent, useReadCampaign} from "../services/blockchain.js"
import { useAccount } from 'wagmi'
import Eventhome from '../components/event/eventhome.js'
import EventHomeCampaign from '../components/event/eventHomeCampaign.js'
export default function Event() {
  const [eventId, setEventId] = useState("1");
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);

  const { data, isSuccess } =  useReadEvent(eventId);

  // Log accumulatedData for debugging
  console.log("EventData:", accumulatedData);

  useEffect(() => {
    if (isSuccess) {
      setAccumulatedData((currentData) => [...currentData, data[0]]);
      setEventId((currentId) => String(Number(currentId) + 1));
    }
  }, [data, isSuccess, eventId, accumulatedData]);

  useEffect(() => {
    if (isSuccess && accumulatedData.length > 0) {
      // Get current timestamp
      const currentTimestamp = Math.floor(Date.now() / 1000);

      // Filter events based on their timestamps
      const ongoing = [];
      const upcoming = [];
      const expired = [];
      accumulatedData.forEach(event => {
        if (event.endTimestamp < currentTimestamp) {
          expired.push(event);
        } else if (event.startTimestamp <= currentTimestamp && event.endTimestamp >= currentTimestamp) {
          ongoing.push(event);
        } else {
          upcoming.push(event);
        }
      });

      // Update state variables
      setOngoingEvents(ongoing);
      setUpcomingEvents(upcoming);
      setExpiredEvents(expired);

      // Increment eventId for fetching next event
      setEventId(String(Number(eventId) + 1));
    }
  }, [accumulatedData, isSuccess, eventId]);

  console.log("Ongoing",ongoingEvents);
  console.log("Upcoming", upcomingEvents);
  console.log("Expired",expiredEvents);
  

  return (
    <>
    
      <MyNavbar/>
      <Eventhome/>
      <EventHomeCampaign/>
      {/* <UnderConstruction/> */}
      {/* <EventCampaign /> */}
      <Footer/>
    </>
  )
}
