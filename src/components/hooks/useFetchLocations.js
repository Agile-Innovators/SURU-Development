import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';

export function useFetchLocations() {
    const [locations, setLocations] = useState([]);
    const [isLoadingLocat, setIsLoadingLocat] = useState(true);
    const axios = useAxios();

    const getData = async () => {
        try {
            const response = await axios.get('/locations');
            const data = await response.data;
            setLocations(data);
            setIsLoadingLocat(false);
        } catch (error) {
            console.log(error);
            setIsLoadingLocat(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        locations,
        isLoadingLocat,
    };
}
