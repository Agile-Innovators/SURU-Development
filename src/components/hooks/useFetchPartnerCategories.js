import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';

export function useFetchPartnersCategories() {
    const axios = useAxios();
    const [ partnersCategories, setPartnersCategories ] = useState([]);
    const [ isLoadingPartnersCats, setIsloadingPartnersCats ] = useState(true);

    const getData = async () => {
        try {
            const response = await axios.get('/partners-categories');
            const data = await response.data;
            console.log(data);
            setPartnersCategories(data);
            setIsloadingPartnersCats(false);
        } catch (error) {
            setIsloadingPartnersCats(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        partnersCategories,
        isLoadingPartnersCats
    };
}
