import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CampDocument from '../components/create/campaign/campDashboard/campDocument'
import LandingPage from '../pages/landingPage'
import CampDashboard from '../components/create/campaign/campDashboard/campDashboard'

export default function PageRoute() {
  return (
    <>
      <Routes>
      <Route path="/camp/*" element={<CampDashboard />} />
      <Route path='/' element={<LandingPage/>}/>
      </Routes>
    </>
  )
}
