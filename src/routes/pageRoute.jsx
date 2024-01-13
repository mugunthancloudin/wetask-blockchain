import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CampDocument from '../components/create/campaign/campDashboard/campDocument'
import LandingPage from '../pages/landingPage'
import CampDashboard from '../components/create/campaign/campDashboard/campDashboard'
import Campaign from '../pages/campaign'
import Space from '../pages/space'
import Event from '../pages/event'

export default function PageRoute() {
  return (
    <>
      <Routes>
      <Route path="/camp/*" element={<CampDashboard />} />
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/campaign' element={<Campaign/>}/>
      <Route path='/space' element={<Space/>}/>
      <Route path='/event' element={<Event/>}/>
      </Routes>
    </>
  )
}
