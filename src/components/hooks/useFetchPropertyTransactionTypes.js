import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';

export const useFetchPropertyTransactionTypes = () => {
    const [transacTypes, setTransacTypes] = useState([]);
    const [isLoadingTransacTypes, setIsLoadingTransacTypes] = useState(true);
    const axios = useAxios();

    const getData = async () => {
        try {
            const response = await axios.get('/property-transaction-types');
            const data = await response.data;
            setTransacTypes(data);
            setIsLoadingTransacTypes(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        transacTypes,
        isLoadingTransacTypes,
    };
};