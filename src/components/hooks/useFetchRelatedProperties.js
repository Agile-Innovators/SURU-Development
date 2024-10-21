import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';

export const useFetchRelatedProperties = (propertyId) => {
    const axios = useAxios();
    const [relatedProperties, setRelatedProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await axios.get(`/properties-related/${propertyId}`);
            const data = await response.data;
            setRelatedProperties(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (propertyId) {
            getData();
        }
    }, [propertyId]);
    

    return {
        relatedProperties,
        isLoading,
    };
};
