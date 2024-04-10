import React, { createContext, useContext, useState, useEffect } from 'react';
import { CreateCampaign } from '../../../../services/blockchain';


const FormContext = createContext();
export const  useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
const [allFormData, setAllFormData] = useState({});
const [isFormDataCompleted, setIsFormDataCompleted] = useState(false);

useEffect(() => {
  const completed = Object.keys(allFormData).length === 3;
  setIsFormDataCompleted(completed);
}, [allFormData]);  

console.log(allFormData);
  const updateFormData = (newData) => {
    setAllFormData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <FormContext.Provider value={{ allFormData, updateFormData }}>
      {children}
      {isFormDataCompleted && <CreateCampaign campaignData={allFormData} />}
    </FormContext.Provider>
  );
};