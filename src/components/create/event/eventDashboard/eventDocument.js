import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import { FormProvider } from '../../campaign/campModule/formprovider';
import EventBasicInfo from '../eventModule/eventBasicInfo';
import EventCampaign from '../eventModule/eventCampaign';
import EventRewards from '../eventModule/eventRewards';

export default function EventDocument() {
  return (
    <>  
        <FormProvider>
            <Routes>
                <Route path="/eventbasicInfo" element={<EventBasicInfo/>} />
                <Route path="/eventcampaign" element={<EventCampaign/>} />
                <Route path="/eventrewards" element={<EventRewards/>} />
                <Route path="/" element={<Navigate to="/eventbasicInfo" replace />} />
            </Routes>
        </FormProvider>
      
    </>
  )
}