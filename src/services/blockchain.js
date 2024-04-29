  import { useContractRead, useContractWrite, useContractInfiniteReads, paginatedIndexesConfig, useAccount, useBalance  } from 'wagmi';
  import React, { useState } from 'react';
  import { ethers, isError } from 'ethers';
  import abi from '../abis/src/contracts/Taskon.sol/CampaignContract.json';
  
  const contractDetails = {
    address: '0x348Cfa7DBE7A6c14775ddDc28beD7d07efa9943a',
    abi: abi.abi,
  };

  export function CreateCampaign(campaignData) { // Assuming default is public
    const campaignDatas=campaignData.campaignData;
    const { data, isLoading, isSuccess,isError, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createCampaign',
    });

    let visibility;
    let minimumBalance = ethers.parseEther(campaignDatas.eligibility.minBalance.toString());
    let pointReward=0;
    let tokenReward=0;
    let numberOfWinners=0;

    //visibility conversion
    if(campaignDatas.BasicInfo.visibility==="public"){
      visibility=true;
    }
    else if(campaignDatas.BasicInfo.visibility==="private"){
      visibility=false;
    }
    else{
      console.log("No visibility mentioned")
    }

    //pointreward check
    if(!campaignDatas.pointReward){
      tokenReward=ethers.parseEther(campaignDatas.tokenReward.rewardToken.toString());
      numberOfWinners=campaignDatas.tokenReward.totalReward;
    }
    if(!campaignDatas.tokenReward){
      pointReward=campaignDatas.pointReward.rewardPoint;
      numberOfWinners=campaignDatas.pointReward.totalReward;
    }
    const handleCreateCampaignClick = () => {
      if(!campaignData){
        return "no data"
      }
      write({
        args: [
          campaignDatas.BasicInfo.campaignName,       // name,
          campaignDatas.BasicInfo.campaignStartDate,  // startTimestamp,
          campaignDatas.BasicInfo.campaignExpairyDate,// endTimestamp,
          campaignDatas.BasicInfo.coverImageIpfsCid,  // imageCID,
          campaignDatas.BasicInfo.campaignDescription,// description : BasicInfo.description,
          tokenReward.toString(),                     // tokenReward,
          pointReward,                                // points,
          campaignDatas.eligibility.taskOnLevel,      // minimum level;,
          minimumBalance.toString(),                  // minimum balance
          numberOfWinners,                            // numberOfWinners,
          campaignDatas.submittedData.cid,            // tasksCID,
          visibility,                                 // visibility,
        ],
      }); 
    };
    return (
      <div>
        <button
          disabled={isLoading || !write}
          onClick={handleCreateCampaignClick}
        >
          {isLoading ? 'Processing...' : 'Create Campaign'}
        </button>
        {isLoading && <div>Transaction is processing. Check your wallet.</div>}
        {isSuccess && <div>Transaction successful: {JSON.stringify(data)}</div>}
      </div>
    );
  }

    export function useReadCampaign(eventId) {
      const { data, isSuccess, isError } = useContractRead({
        ...contractDetails,
        functionName: 'getCampaign',
        args: eventId,
      })

      // Function to recursively convert numbers to strings in an object
    const stringifyNumbers = obj => {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          stringifyNumbers(obj[key]); // Recursively call for nested objects
        } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
          obj[key] = obj[key].toString(); // Convert number or bigint to string
        }
      }
    };

    // Convert numbers to strings in the data object
    if (data) {
      stringifyNumbers(data);
    }

      return (
        {data, isSuccess, isError}
      )
    }

    export function ReadEvent(eventId) {
      const { data, isSuccess, isError } = useContractRead({
        ...contractDetails,
        functionName: 'getEvent',
        args: eventId,
      })

      // Function to recursively convert numbers to strings in an object
    const stringifyNumbers = obj => {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          stringifyNumbers(obj[key]); // Recursively call for nested objects
        } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
          obj[key] = obj[key].toString(); // Convert number or bigint to string
        }
      }
    };

    // Convert numbers to strings in the data object
    if (data) {
      stringifyNumbers(data);
    }

      return (
        {data, isSuccess, isError}
      )
    }

  export function Deposit({ amount }) {
    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'deposit',
    });
  
    const handleDeposit = () => {
      if (!isNaN(amount)) {
        // Convert the amount to ethers format
        const amountInEth = ethers.parseEther(amount.toString());
  
        // Call the write function with the converted amount  
        write({ value: amountInEth });
      } else {
        console.log("Invalid amount");
      }
    };
  
    return (
      <div>
        <button
          disabled={!write}
          onClick={handleDeposit}
        >
          Deposit
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    );
  }

  export function CreateEvent(eventData) { // Assuming default is public
    const eventDatas=eventData.eventData;
    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createEvent',
    });

    let pointReward=0;
    let tokenReward=0;
    let numberOfWinners=0;

    //pointreward check
    if(eventDatas.tokenReward){
      tokenReward=ethers.parseEther(eventDatas.tokenReward.rewardToken.toString());
      numberOfWinners=eventDatas.tokenReward.totalReward;
    }
    if(eventDatas.pointReward){
      pointReward=eventDatas.pointReward.rewardPoint;
      numberOfWinners=eventDatas.pointReward.totalReward;
    }

    const handleCreateEventClick = () => {
      if(!eventData){
        return "no event";}
      write({
        args: [
          eventDatas.BasicInfo.campaignName,       // name,
          eventDatas.BasicInfo.campaignStartDate,  // startTimestamp,
          eventDatas.BasicInfo.campaignExpairyDate,// endTimestamp,
          eventDatas.BasicInfo.coverImageIpfsCid,  // imageCID,
          "",                                      // description
          // eventDatas.BasicInfo.campaignDescription,// description : BasicInfo.description,
          tokenReward.toString(),                     // tokenReward,
          eventDatas.minCampaigns,                    // minimumCampaigns to be complete
          pointReward,                                // points,
          numberOfWinners,                            // numberOfWinners,
          eventDatas.selectedCampaignIds,             // campaignIds to add
        ],
      }); 
    };
    return (
      <div>
        <button
          disabled={isLoading || !write}
          onClick={handleCreateEventClick}
        >
          {isLoading ? 'Processing...' : 'Create Event'}
        </button>
        {isLoading && <div>Transaction is processing. Check your wallet.</div>}
        {isSuccess && <div>Transaction successful: {JSON.stringify(data)}</div>}
      </div>
    );
  }

  export function CreateSpace(spaceData) { // Assuming default is public
    const spaceDatas=spaceData.spaceData;
    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createSpace',
    });

    const handleCreateEventClick = () => {
      if(!spaceData){
        return "no event";}
      write({
        args: [
          spaceDatas.name,                     
          spaceDatas.image,              //
          spaceDatas.category,           //
          spaceDatas.officialWebsite,  
          spaceDatas.discordLink,                     
          spaceDatas.telegramLink,
          spaceDatas.description,
          spaceDatas.campaignIds,        //
          spaceDatas.eventIds            //
        ],
      }); 
    };
    return (
      <div>
        <button
          disabled={isLoading || !write}
          onClick={handleCreateEventClick}
        >
          {isLoading ? 'Processing...' : 'Create Space'}
        </button>
        {isLoading && <div>Transaction is processing. Check your wallet.</div>}
        {isSuccess && <div>Transaction successful: {JSON.stringify(data)}</div>}
      </div>
    );
  }

  export function JoinCampaign({campaignId}) { // Assuming default is public

    const { data, isLoading, isSuccess, isError, error, write } = useContractWrite({
      ...contractDetails,
      functionName: 'joinCampaign',
      args: [campaignId],
    });

  return (
    <div>
      <button
  disabled={!write}
  onClick={() =>
    write({
      args: [campaignId],
    })
  }
  style={{
    padding: '5px 10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50', // Green background color
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  }}
>
  Join Campaign
</button>
      {isError && alert(error)}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  )
}

export function JoinEvent({eventId}) { // Assuming default is public

  const { data, isLoading, isSuccess, isError, error, write } = useContractWrite({
    ...contractDetails,
    functionName: 'joinEvent',
    args: [eventId],
  });

return (
  <div>
    <button
disabled={!write}
onClick={() =>
  write({
    args: [eventId],
  })
}
style={{
  padding: '5px 10px',
  fontSize: '16px',
  backgroundColor: '#4CAF50', // Green background color
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
}}
>
Join Event
</button>
    {isError && alert(error)}
    {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
  </div>
)
}

  export function JoinSpace() { // Assuming default is public

    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createSpace',
            args: [],
    });
  }

  export function ViewCampaignParticipants(eventId) {
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getCampaignParticipants',
      args: eventId,  
    })
    return (
      {data, isSuccess, isError}
    )
  }

  export function UserView() {
    let balance = '0';
    const {address, isConnected} = useAccount({}); 
    const balanceFetch = useBalance({
      address: address,
      if(isConnected) {
        balance = balanceFetch.data.formatted
      }
    });
   
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getUser',
      args: [address],
    })

   // Function to recursively convert numbers to strings in an object
  const stringifyNumbers = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        stringifyNumbers(obj[key]); // Recursively call for nested objects
      } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
        obj[key] = obj[key].toString(); // Convert number or bigint to string
      }
    }
  };

  // Convert numbers to strings in the data object
  if (data) {
    stringifyNumbers(data);
  }

  return {
    data,
    isSuccess,
    isError,
    isConnected,
    balance
  };
}

  export function useGetCampaignsByCreator(creatorAddress) {
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getCampaignsByCreator',
      args: [creatorAddress],  
    })

    // Function to recursively convert numbers to strings in an object
  const stringifyNumbers = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        stringifyNumbers(obj[key]); // Recursively call for nested objects
      } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
        obj[key] = Number(obj[key]); // Convert number or bigint to string
      }
    }
  };

  // Convert numbers to strings in the data object
  if (data) {
    stringifyNumbers(data);
  }
   
    return (
      {data, isSuccess, isError}
    )
  }


  export function useReadEvent(eventId) {
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getEvent',
      args: [eventId],
    })

  const stringifyNumbers = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        stringifyNumbers(obj[key]); // Recursively call for nested objects
      } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
        obj[key] = obj[key].toString(); // Convert number or bigint to string
      }
    }
  };

  // Convert numbers to strings in the data object
  if (data) {
    stringifyNumbers(data);
  }

    return (
      {data, isSuccess, isError}
    )
  }

  export function useGetEventByCreator(creatorAddress) {
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getEventsByHost',
      args: [creatorAddress],  
    })

    // Function to recursively convert numbers to strings in an object
  const stringifyNumbers = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        stringifyNumbers(obj[key]); // Recursively call for nested objects
      } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
        obj[key] = Number(obj[key]); // Convert number or bigint to string
      }
    }
  };

  // Convert numbers to strings in the data object
  if (data) {
    stringifyNumbers(data);
  }
   
    return (
      {data, isSuccess, isError}
    )
  }

  export function GetAllEvents(){
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getAllEventIDs' 
    })

    const stringifyNumbers = obj => {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          stringifyNumbers(obj[key]); // Recursively call for nested objects
        } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
          obj[key] = Number(obj[key]); // Convert number or bigint to string
        }
      }
    };
  
    // Convert numbers to strings in the data object
    if (data) {
      stringifyNumbers(data);
    }

    return(
      {data, isSuccess, isError}
    )
  }

  export function SpaceCampaigns(ids){
      const { data, fetchNextPage } = useContractInfiniteReads({
        cacheKey: 'campaignAttributes',
        contracts() {
          const contractsArray = ids.map((param) => {
            const args = param ;
             return [
              { ...contractDetails, functionName: 'getCampaign', args },
            ];
          });
          return contractsArray.flat();
        },
      });
  return(data)
  }


  export function ReadSpace(count){
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getSpace',
      args: [count],
    })

      return (
        {data, isSuccess, isError}
      )
  }


  export function SpaceEvents(ids){
    const { data, fetchNextPage } = useContractInfiniteReads({
      cacheKey: 'eventAttributes',
      contracts() {
        const contractsArray = ids.map((param) => {
          const args = param ;
          return [
            { ...contractDetails, functionName: 'getEvent', args },
          ];
        });
        return contractsArray.flat();
      },
    });
return(data)
}

export function GetSpaceCampaign(id){
  const { data, isSuccess, isError } = useContractRead({
    ...contractDetails,
    functionName: 'getCampaign',
    args: [id],
  })

  const stringifyNumbers = obj => {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            stringifyNumbers(obj[key]); // Recursively call for nested objects
        } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
            obj[key] = obj[key].toString(); // Convert number or bigint to string
        } else if (typeof obj[key] === 'object' && obj[key] && obj[key].toNumber) {
            // Check if it's a BigNumber instance
            obj[key] = obj[key].toNumber(); // Convert BigNumber to number
        }
    }
};

if (data) {
  stringifyNumbers(data);
}

  return (
    {data, isSuccess, isError}
  )
}
