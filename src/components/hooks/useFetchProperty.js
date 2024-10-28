import { useAxios } from './useAxios';
import { useState, useEffect } from 'react';

export function useFetchProperty(propertyId) {
    const [property, setProperty] = useState(null);
    const [isLoadingProp, setIsLoadingProp] = useState(true);
    const axios = useAxios();

    const getData = async () => {
        try {
            const response = await axios.get(`properties/property/${propertyId}`);
            const data = await response.data.property;
            setIsLoadingProp(false);
            setProperty(data);
        } catch (error) {
            console.log(error);
            setIsLoadingProp(false);
        }
    };

    useEffect(() => {
        if (propertyId) {
            getData();
        }
    }, [propertyId]);

    return {
        property,
        isLoadingProp,
    };
}