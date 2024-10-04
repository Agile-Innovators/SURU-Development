import { useState, useEffect, useContext } from 'react'
import { useAxios } from './useAxios'
import { globalProvider } from '../../global/GlobalProvider'

export const useFetchPropertyDetails = () => {
  const { propertyId } = useContext(globalProvider)
  const [propertyDetails, setPropertyDetails] = useState([])
  const [isLoadingPropsDetails, setIsLoadingPropsDetails] = useState(true);
  let url;

  const getData = async (id) => {
    try {
      url = `/properties/property/${propertyId}`
      const response = await axios.get(url)
      console.log(response);
      const data = await response.data;
      console.log(data);
      const propertiesDetails = data.data;
      console.log(propertiesDetails);
      setPropertyDetails(propertiesDetails)
      setIsLoadingPropsDetails(false)
    } catch (error) {
      console.log(error)
      setIsLoadingPropsDetails(false)

    }
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    propertyDetails,
    isLoadingPropsDetails
  }
}
