import React, { useState, useEffect } from 'react';
import { ReadCampaign } from '../../services/blockchain';
import { isError } from 'ethers';
import banner from "../assets/campaignBanner/dragonCamp.png"
import CampaignJoin from './campaignJoin';


const CampaignHome = () => {
  const [campaignId, setCampaignId] = useState('1');
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [products, setProducts] = useState([]);
  // const { data, fetchNextPage } = useReadCampaign();
  const {data, isSuccess} = ReadCampaign(campaignId); 

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
  }, [data, isSuccess, campaignId, accumulatedData]);


  useEffect(() => {
    
    const fetchData = async () => { 
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  const handleCampaignClick = (id) => {
    // Find the clicked campaign object by id
    const clickedCampaign = accumulatedData.find(item => item.id === id);
    console.log('Clicked campaign details:', clickedCampaign);
  };

  console.log(accumulatedData)

  return (
    <>
    {/* <button onClick={handleReadData}>View Blockchain Campaigns</button> */}
    {/* <button onClick={handleFetchNextPage}>Fetch Next Blockchain Page</button> */}
    <CampaignJoin />
      <div className="container-fluid bg-black text-white">
        <div className='row'>
          <img src={banner} alt='banner' />
        </div>
          <div className="row">
            {accumulatedData.map((accumulatedData) => (
              <div key={accumulatedData.id} className="col-md-4 mb-4">
                <div className="card h-100" onClick={() => handleCampaignClick(accumulatedData.id)} >
                  <div className="card-body">
                    <h5 className="card-title">{accumulatedData.title}</h5>
                    <img src={accumulatedData.image} alt='productImage' className='w-100'/>
                    <p className="card-text">Category: {accumulatedData.category}</p>
                    <p className="card-text">Price: ${accumulatedData.price}</p>
                    <p className="card-text">{accumulatedData.description}</p>
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
