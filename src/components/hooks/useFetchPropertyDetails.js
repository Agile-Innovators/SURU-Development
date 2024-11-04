import { useState, useEffect } from 'react';
import { useAxios } from '../../components/hooks/useAxios.js';

export const useFetchPropertyDetails = (propertyId) => {
    const [propertyDetails, setPropertyDetails] = useState([]);
    const [isLoadingPropsDetails, setIsLoadingPropsDetails] = useState(true);
    const axios = useAxios();

    const getData = async () => {
        setIsLoadingPropsDetails(true);
        try {
            
            const url = `/properties/property/${propertyId}`;
            const response = await axios.get(url);

            const data = response.data;
            setPropertyDetails(data);

            setIsLoadingPropsDetails(false);
        } catch (error) {
            console.log(error);
            setIsLoadingPropsDetails(false);
        }
    };

    useEffect(() => {
        getData();
    }, [propertyId]);

    return {
        propertyDetails,
        isLoadingPropsDetails,
    };
};
