import React from 'react';
import "./referal.css";
import { CiUser } from "react-icons/ci";
import { FiGift } from "react-icons/fi";

export default function Referal() {
  return (
    <>
      <div className='container-fluid ref-body '>
        <div className='left-cont  text-white'>
          <h2 className='mt-5'>Create Referral</h2>
          <div className='ref-btn-1  mt-5 '>
        <button  className='position-absolute'>
              <span className='ref-icon position-relative'><CiUser /></span>
              Basic info
            </button> 
          </div>
          
          <div className='ref-btn-2 mt-5'>
            <button className='position-absolute'>
              <span className='ref-icon2 position-relative'><FiGift /></span>
              Rewards
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
 