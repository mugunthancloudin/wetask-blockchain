import React from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import { useState,useEffect } from 'react'
import { ReadSpace, Spacecount} from '../services/blockchain'
import { useAccount } from 'wagmi'
export default function Space() {

  const [spaceId, setSpaceId] = useState('1');
  const [accumulatedData, setAccumulatedData] = useState([]);
  
  const {data , isSuccess} = ReadSpace(spaceId)
  useEffect(() => {
        if (isSuccess && data[0].name) {
          setAccumulatedData((currentData) => [...currentData, data[0]]);
          setSpaceId((currentId) => String(Number(currentId) + 1));
        }
      } , [data, isSuccess, spaceId, accumulatedData]); // Ensure all relevant variables are included in dependency array

    console.log("SpaceData:", accumulatedData);

  return (
    <>
      <MyNavbar/>
      <UnderConstruction/>
      <Footer/>
    </>
  )
}
