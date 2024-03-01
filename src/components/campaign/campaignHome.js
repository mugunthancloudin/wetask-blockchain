import React, { useState, useEffect } from 'react';
import { ReadCampaign } from '../../services/blockchain';
import { isError } from 'ethers';
import banner from "../assets/campaignBanner/dragonCamp.png";
import CampaignJoin from './campaignJoin';

const CampaignHome = () => {
  const [campaignId, setCampaignId] = useState("1");
  const [accumulatedData, setAccumulatedData] = useState([]);
  const { data, isSuccess } = ReadCampaign(campaignId);

  console.log(data[0]);
  console.log(accumulatedData);
  

  useEffect(() => {
    if (isSuccess) {
      const convertedData = {
        ...data[0],
        endTimestamp: data[0].endTimestamp.toString(),
        id: data[0].id.toString(),
        minimumBalance: data[0].minimumBalance.toString(),
        minimumLevel: data[0].minimumLevel.toString(),
        points: data[0].points.toString(),
        numberOfWinners: data[0].numberOfWinners.toString(),
        randomnessBlockNumber: data[0].randomnessBlockNumber.toString(),
        startTimestamp: data[0].startTimestamp.toString(),
        tokenReward: data[0].tokenReward.toString()
      };
      setAccumulatedData(currentData => [...currentData, convertedData]);
      setCampaignId(currentId => String(Number(currentId) + 1));
    } else if (isError) {
      console.log('completed fetching');
    } else {
      console.log("error");
    }
  }, [data, isSuccess, campaignId]);

  return ( 
    <>
      <CampaignJoin />
      <div className="container-fluid bg-black text-white">
        <div className='row'>
          <img src={banner} alt='banner' />
        </div>
        <div className="row">
          {accumulatedData.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <img src={product.image} alt='productImage' className='w-100'/>
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CampaignHome;