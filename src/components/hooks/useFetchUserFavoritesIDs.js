import { useState, useEffect } from 'react';
import { useAxios } from "./useAxios";

export function useFetchUserFavoritesIDs(){
    const [userFavoritesIDs, setUserFavoritesIDs] = useState([]);
    const [isLoadingFavoritesIDs, SetIsLoadingFavoritesIDs] = useState(true);
    const axios = useAxios();
    let userId;

    const getData = async () => {
        const data = localStorage.getItem('user');
        if (data) {
            const userData = JSON.parse(data);
            userId = userData.id;
        }

        try {
            console.log("Ejecucion")
            const response = await axios.get(`user/${userId}/favorites/ids`);
            const data = await response.data;
            console.log(data);
            SetIsLoadingFavoritesIDs(false);
            setUserFavoritesIDs(data);
        } catch (error) {
            console.log(error);
            SetIsLoadingFavoritesIDs(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        userFavoritesIDs,
        isLoadingFavoritesIDs,
    };
}