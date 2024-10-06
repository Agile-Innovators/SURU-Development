import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";  
import { useAuth } from "../../global/AuthProvider";


export function useFetchUserProperties(){
    const [properties, setProperties] = useState([]);
    const [isLoadingProps, setIsLoadingProps] = useState([true]);
    const axios = useAxios();
    const { getAuthToken, getUser } = useAuth();
    const user = getUser();
    console.log("El usuario es el siguiente " + JSON.stringify(user));

    const getData = async () => {
        try {
            const response = await axios.get('/properties/user/' + user.user.id);
            const data = await response.data;
            console.log("La información de propiedades es la siguiente" +data);
            const properties = data;
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