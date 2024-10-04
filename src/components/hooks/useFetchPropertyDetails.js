import { useState, useEffect, useContext } from 'react'
import { useAxios } from "../../components/hooks/useAxios.js";
import { globalProvider } from '../../global/GlobalProvider'

export const useFetchPropertyDetails = () => {
  const { propertyID } = useContext(globalProvider)
  const [propertyDetails, setPropertyDetails] = useState([])
  const [isLoadingPropsDetails, setIsLoadingPropsDetails] = useState(true);
  console.log("ID:", propertyID);
  const axios = useAxios();

  const getData = async () => {
    try {
      const url = `/properties/property/1`; // Corrigiendo URL
      const response = await axios.get(url);
      
      const data = response.data;
      console.log(JSON.stringify(data, null, 2));
      setPropertyDetails(data);
    
      setIsLoadingPropsDetails(false);
    } catch (error) {
      console.log(error);
      setIsLoadingPropsDetails(false);
    }
  };

  useEffect(() => {
    if (propertyID) {
      getData(); 
    }
  }, [propertyID]); 

  return {
    propertyDetails,
    isLoadingPropsDetails
  }
}
