import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
const [allFormData, setAllFormData] = useState({});
console.log(allFormData);
  const updateFormData = (newData) => {
    setAllFormData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <FormContext.Provider value={{ allFormData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
