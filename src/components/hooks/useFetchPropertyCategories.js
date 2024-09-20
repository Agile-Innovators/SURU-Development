import { useState, useEffect } from "react"
import { useAxios } from "./useAxios"

export const useFetchPropertyCategories = () => {
    const [propertyCategories, setPropertyCategories] = useState([]);
    const [isLoadingPropsCats, setIsLoadingPropsCats] = useState(true);
    const axios = useAxios();

    const getData = async () => {
        try {
            const response = await axios.get("/properties-categories");
            const data = await response.data;
            const propertiesCategories = data.data;
            setPropertyCategories(propertiesCategories);
            setIsLoadingPropsCats(false)
        } catch (error) {
            console.log(error)  
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return {
        propertyCategories,
        isLoadingPropsCats
    }

}