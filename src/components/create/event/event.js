import React, { useEffect, useState } from 'react';
import { GetAllEvents, useReadEvent } from '../../../services/blockchain';
import { useAccount } from 'wagmi';

export default function Event() {
  const { address } = useAccount();
  const { data,isSuccess } = GetAllEvents();
  const initialEventIdState = isSuccess ? data : null;
  const [eventId, setEventId] = useState(initialEventIdState);
  const fetchEventDetails = useReadEvent(eventId ? String(eventId[0]) : null);
  const [eventDetails, setEventDetails] = useState([]);

  if (data === undefined || data === null) {
    console.log("Connect wallet/No campaign available");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data && data !== undefined && fetchEventDetails && eventId && eventId.length > 0) { // Check eventId existence and length
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

  console.log("event details:", eventDetails);
}
