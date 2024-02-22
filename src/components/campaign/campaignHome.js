import React, { useState, useEffect } from 'react';
import { useReadCampaign } from '../../services/blockchain';


const CampaignHome = () => {

  const [products, setProducts] = useState([]);
  const { data, fetchNextPage } = useReadCampaign();

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

  const handleLogBlockchainData = () => {
    console.log(data.pages);
  };

  const handleFetchNextPage = async () => {
    if(fetchNextPage.status === 'success'){
    console.log(data);
    }else{console.log("No pages left")}
  };

  // const campaignDashboardData= ReadCampaign();
  // console.log(campaignDashboardData);

  return (
    <>
    <button onClick={handleLogBlockchainData}>View Blockchain Campaigns</button>
    <button onClick={handleFetchNextPage}>Fetch Next Blockchain Page</button>
      <div className="container-fluid bg-black text-white">
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>                     <img src={product.image} alt='productImage' className='w-100'/>
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
