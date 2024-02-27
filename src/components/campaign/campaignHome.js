import React, { useState, useEffect } from 'react';
import { ReadCampaign } from '../../services/blockchain';
import { isError } from 'ethers';
import banner from "../assets/campaignBanner/dragonCamp.png"
import TwitterAuth from '../authentication/twitterAuth';

const CampaignHome = () => {
  const [campaignId, setCampaignId] = useState('1');
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [products, setProducts] = useState([]);
  const [twitterConnected, setTwitterConnected] = useState(false);
  // const { data, fetchNextPage } = useReadCampaign();
  const {data, isSuccess} = ReadCampaign(campaignId); 

  useEffect(() => {
    if (isSuccess) {
      // console.log(data[0]);
      setAccumulatedData(currentData => [...currentData, data[0]]);
      setCampaignId(currentId => String(Number(currentId) + 1));
    } else if (isError) {
      console.log('completed fetching');
    } else {
      console.log("error");
    }
  }, [data, isSuccess,campaignId,accumulatedData]);


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

  console.log(accumulatedData)

  return (
    <>
    {/* <button onClick={handleReadData}>View Blockchain Campaigns</button> */}
    {/* <button onClick={handleFetchNextPage}>Fetch Next Blockchain Page</button> */}
      <div className="container-fluid bg-black text-white">
      <TwitterAuth twitterConnected={twitterConnected} setTwitterConnected={setTwitterConnected} />
        <div className='row'>
          <img src={banner} alt='banner' />
        </div>
          <div className="row">
            {accumulatedData.map((accumulatedData) => (
              <div key={accumulatedData.id} className="col-md-4 mb-4">
                <div className="card h-100">
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
