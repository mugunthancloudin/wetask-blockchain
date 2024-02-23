import React, { useState, useEffect } from 'react';
import { ReadCampaign } from '../../services/blockchain';
import { isError } from 'ethers';


const CampaignHome = () => {
  const [campaignId, setCampaignId] = useState('1');
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [products, setProducts] = useState([]);
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
        <div className="container">
          <div className="row">
            {products.map((product) => (
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
      </div>
    </>
  );
};


export default CampaignHome;
