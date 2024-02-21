import React, { useState, useEffect } from 'react';

const CampaignHome = () => {

  const [products, setProducts] = useState([]);

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


  return (
    <>
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
