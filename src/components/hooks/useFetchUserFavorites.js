import { useState, useEffect } from 'react';
import { useAxios } from "./useAxios";

export function useFetchUserFavorites(){
    const [userFavorites, setUserFavorites] = useState([]);
    const [isLoadingFavorites, SetIsLoadingFavorites] = useState(true);
    const axios = useAxios();
    let userId;

    const getData = async () => {
        const data = localStorage.getItem('user');
        if (data) {
            const userData = JSON.parse(data);
            userId = userData.id;
        }

        try {
            const response = await axios.get(`user/${userId}/favorites`);
            const data = await response.data;
            console.log(data);
            SetIsLoadingFavorites(false);
            setUserFavorites(data);
        } catch (error) {
            console.log(error);
            SetIsLoadingFavorites(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        userFavorites,
        isLoadingFavorites,
    };
}