import React from 'react'
import MyNavbar from '../components/navbar & footer/navbar/navbar'
import UnderConstruction from '../components/underContruction/underConstruction'
import Footer from '../components/navbar & footer/footer/footer'
import { useState,useEffect } from 'react'
import { ReadSpace, Spacecount} from '../services/blockchain'
import { useAccount } from 'wagmi'
export default function Space() {
  const count = Spacecount();
  const data = ReadSpace(parseInt(count.data));
  console.log(data.pages[0])

  return (
    <>
      <MyNavbar/>
      <UnderConstruction/>
      <Footer/>
    </>
  )
}
