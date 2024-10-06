import { useState, useEffect, useContext } from "react";
import { useAxios } from "./useAxios";
import { globalProvider } from "../../global/GlobalProvider";

export const useFetchFilter = () => {
    const axios = useAxios();
    let response;
    const {
        regionId,
        minPrice,
        maxPrice,
        propertyTypeId,
        isFilterUsed,
        setIsFilterUsed,
    } = useContext(globalProvider);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            if (isFilterUsed) {
                response = await axios.get("/properties/filter", {
                    params: {
                        regionId: regionId,
                        minPrice: minPrice,
                        maxPrice: maxPrice,
                        propertyCategoryId: propertyTypeId,
                    },
                });
                console.log('se ejecuto el filtro');
                setIsFilterUsed(false);
            } else {
                response = await axios.get("/properties");
                console.log('get properties');
            }
            const data = await response.data;
            setData(data);
            console.log(data);
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
    };
};
