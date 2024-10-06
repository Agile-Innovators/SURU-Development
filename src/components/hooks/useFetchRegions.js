import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';

export const useFetchRegions = () => {
    const axios = useAxios();
    const [regions, setRegions] = useState([]);
    const [isLoadingRegion, setIsLoadingRegion] = useState(true);

    const getData = async () => {
        try {
            const response = await axios.get('/regions');
            const data = await response.data;
            setRegions(data);
            setIsLoadingRegion(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        regions,
        isLoadingRegion,
    };
};
