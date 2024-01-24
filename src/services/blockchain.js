import { useContractReads, useContractWrite  } from 'wagmi';
import React, { useState } from 'react';
import abi from '../abis/src/contracts/Taskon.sol/Taskon.json';

const contractDetails = {
  address: '0x4728F9C0C473787575718Fa6F076557F5Eb3A235',
  abi: abi.abi,
};
 
export function CreateCampaign() { // Assuming default is public

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...contractDetails,
    functionName: 'createCampaign',
    args: [],
  });
}

export function CreateEvent() { // Assuming default is public

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...contractDetails,
    functionName: 'createEvent',
    args: [],
  });
}

export function CreateSpace() { // Assuming default is public

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...contractDetails,
    functionName: 'createSpace',
    args: [],
  });
}
