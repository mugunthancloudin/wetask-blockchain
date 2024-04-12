import React from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import { useState,useEffect } from 'react'
import { ReadSpace, Spacecount} from '../services/blockchain'
import { useAccount } from 'wagmi'
export default function Space() {
  const { address } = useAccount();
  const count = Spacecount();
  const CountNum = Number(count.data);
  const spacenum = [];
  for(let i=1 ; i<=CountNum; i++){
    spacenum.push(i);
  }
  console.log(spacenum)

  const [spaceId, setSpaceId] = useState(spacenum);
  const fetchSpaceDetails = ReadSpace(spaceId ? String(spaceId[0]) : null);
  const [spaceDetails, setSpaceDetails] = useState([]);

  if (spacenum === undefined || spacenum === null) {
    console.log("Connect wallet/No campaign available");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fetchSpaceDetails && spaceId && spaceId.length > 0) { // Check eventId existence and length
          setSpaceDetails(prevData => [...prevData, fetchSpaceDetails.data[0]]);
          setSpaceId(prevIds => prevIds.slice(1));        
        } 
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      } 
    };

    if (spacenum && spacenum.length > 0) { // Check if data is available before fetching
      fetchData();
    }
  }, [spaceId, fetchSpaceDetails, spacenum, address]); // Ensure all relevant variables are included in dependency array

  console.log("space details:", spaceDetails);

  return (
    <>
      <MyNavbar/>
      <UnderConstruction/>
      <Footer/>
    </>
  )
}
