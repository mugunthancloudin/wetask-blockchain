import React from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import EventCampaign from "../components/create/event/eventModule/eventCampaign.js"
export default function Event() {
  return (
    <>
      <MyNavbar/>
      <EventCampaign />
      <Footer/>
    </>
  )
}
