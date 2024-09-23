import { useState, useEffect, useContext } from "react"
import { useAxios } from "./useAxios" 
import { globalProvider } from "../../global/GlobalProvider";

export const useFetchFilter = () => {
    const axios = useAxios();
    const { regionId, minPrice, maxPrice, propertyTypeId, isFilterUsed, setIsFilterUsed } = useContext(globalProvider)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let url;

    const getData = async () =>{
        try{
            console.log("testing using: ", isFilterUsed)
            if(isFilterUsed){
                url = `properties/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&region_id=${regionId}&category_id=${propertyTypeId}`
                setIsFilterUsed(false)
            }
            else{
                url = "others/filters"
                console.log("test")
            }
            const response = await axios.get(url);
            const dataProperty = await response.data;
            console.log("datos del fetch: ", dataProperty)
            setData(dataProperty);
            setIsLoading(false);
        }catch(error){
            console.log(error)
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        getData();
    }, []);

    return{
        data,
        isLoading
    }
} 