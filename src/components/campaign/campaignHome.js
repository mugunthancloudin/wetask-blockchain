import React, { useState, useEffect } from "react";
import { useReadCampaign } from "../../services/blockchain";
import "./campaign.css";
import banner from "../assets/campaignBanner/dragonCamp.png"


const CampaignHome = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  const { data, fetchNextPage } = useReadCampaign();
  const [mugunth, setMugunth] = useState();
  console.log(mugunth);

  console.log(products);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogBlockchainData = () => {
    data.pages.forEach((page, pageIndex) => {
      // Filter out only success results within each page
      const successResults = page.filter(
        (result) => result.status === "success"
      );

      // Log each success result, if any
      if (successResults.length > 0) {
        // console.log(data.pages[0][0].result[0].description);
        // console.log(data.pages[0][0].result[0].description);
        setMugunth(data);

        // console.log(`Page ${pageIndex + 1} - Campaigns`);
        // successResults.forEach((result, resultIndex) => {
        //   console.log(`Result ${resultIndex + 1}:`, result);
        // });
      } else {
        console.log(`Page ${pageIndex + 1} - No Campaign pulished yet`);
      }
    });
  };

  const handleFetchNextPage = async () => {
    if (fetchNextPage.status === "success") {
      console.log(data);
    } else {
      console.log("No pages left");
    }
  };

  // const campaignDashboardData= ReadCampaign();
  // console.log(campaignDashboardData);

  return (
    <>
      {/* <button onClick={handleLogBlockchainData}>
        View Blockchain Campaigns
      </button>
      <button onClick={handleFetchNextPage}>Fetch Next Blockchain Page</button> */}

      {/* <div className="container">
        <div className="row">
          {mugunth.map((mugunth) =>(  
<div key={}
          ))}
        </div>
      </div> */}


      <div className="container-fluid bg-black text-white">
        <div className="row campignBanner">
        <img src={banner} alt="banner"/>
        </div>
        <div className="row py-5">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <img
                    src={product.image}
                    alt="productImage"
                    className="w-100"
                  />
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  {/* <p className="card-text">{product.description}</p> */}
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
