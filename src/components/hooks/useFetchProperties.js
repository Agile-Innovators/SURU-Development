import { useAxios } from './useAxios';
import { useState, useEffect } from 'react';

export function useFetchProperties() {
    const [properties, setProperties] = useState([]);
    const [isLoadingProps, SetIsLoadingProps] = useState(true);
    const axios = useAxios();

    const getData = async () => {
        try {
            const response = await axios.get('properties');
            const data = await response.data;
            // console.log(data);
            setProperties(data);
            SetIsLoadingProps(false);
        } catch (error) {
            console.log(error);
            SetIsLoadingProps(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        properties,
        isLoadingProps,
    };
}
