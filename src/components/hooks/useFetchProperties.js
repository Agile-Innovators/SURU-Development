import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";  

export function useFetchProperties(){
    const [properties, setProperties] = useState([]);
    const [isLoadingProps, setIsLoadingProps] = useState([true]);
    const axios = useAxios();


    const getData = async () => {
        try {
            const response = await axios.get('properties?populate=*');
            const data = await response.data;
            const properties = data.data;
            setProperties(properties);
            setIsLoadingProps(false)
            
        } catch (error) {
            console.log(error)
            setIsLoadingProps(false)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return{
        properties,
        isLoadingProps
    }

}