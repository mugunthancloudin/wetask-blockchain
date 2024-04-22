import React , {useState, useEffect}from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import EventCampaign from "../components/create/event/eventModule/eventCampaign.js"
import {GetAllEvents, useReadEvent} from "../services/blockchain.js"
import { useAccount } from 'wagmi'
import Eventhome from '../components/event/eventhome.js'
import EventDetails from '../components/event/eventDetails.js'
export default function Event() {

  return (
    <>
    
      <MyNavbar/>
      <Eventhome/>
      <EventDetails/>
      {/* <UnderConstruction/> */}
      {/* <EventCampaign /> */}
      <Footer/>
    </>
  )
}
