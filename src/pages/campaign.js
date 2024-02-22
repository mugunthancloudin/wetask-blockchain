import React from 'react';
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import CampaignHome from '../components/campaign/campaignHome';

export default function Campaign() {
  return (
    <>
      <MyNavbar/>
      <CampaignHome/>
      {/* <UnderConstruction/> */}
      <Footer/>
    </>
  )
}
