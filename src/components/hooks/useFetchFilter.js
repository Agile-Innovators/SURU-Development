import { useState, useEffect, useContext } from 'react';
import { useAxios } from './useAxios';
import { globalProvider } from '../../global/GlobalProvider';

export const useFetchFilter = () => {
    const axios = useAxios();
    let response;
    const {
        regionId,
        propertyTypeId,
        isFilterUsed,
        setIsFilterUsed,
    } = useContext(globalProvider);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ filterUsed, setFilterUsed ] = useState(false);

    const getData = async () => {
        
        try {
            if (isFilterUsed) {
                response = await axios.get('/properties/filter', {
                    params: {
                        regionId: regionId,
                        // minPrice: minPrice,
                        // maxPrice: maxPrice,
                        propertyCategoryId: propertyTypeId,
                    },
                });
                // console.log(regionId);
                // console.log(propertyTypeId);
                setFilterUsed(true);
                setIsFilterUsed(false);
            } else {
                response = await axios.get('/properties');
                // console.log('get properties');
            }
            const data = await response.data;
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        data,
        isLoading,
        filterUsed,
        regionId,
        propertyTypeId
    };
};
