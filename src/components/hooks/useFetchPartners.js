import { useAxios } from './useAxios';
import { useState, useEffect } from 'react';

export function useFetchPartners(){
    const axios = useAxios();
    const [ partners, setPartners ] = useState([]);
    const [ isloadingPartners, setIsloadingPartners ] = useState(true);

    const getData = async () =>{
        try{
            const response = await axios.get('/partners');
            const data = await response.data;
            setPartners(data);
            setIsloadingPartners(false);
        }catch(error){
            setIsloadingPartners(false);
            console.log(error)
        }
    }

    useEffect(() => {
        getData();
    },[]);

    return {
        partners,
        isloadingPartners
    }
}