import { useState, useEffect } from 'react';
import { useAxios } from './useAxios';
import { useAuth } from '../../global/AuthProvider.jsx';


export function useFetchUserFavoritesIDs() {
    const [userFavoritesIDs, setUserFavoritesIDs] = useState([]);
    const [isLoadingFavoritesIDs, SetIsLoadingFavoritesIDs] = useState(true);
    const axios = useAxios();
    let userId;
    const { getUser } = useAuth();
    const user = getUser().user;

    const getData = async () => {
        if (user != null) {
            const data = localStorage.getItem('user');
            if (data) {
                const userData = JSON.parse(data);
                userId = userData.id;
            }
            try {
                const response = await axios.get(
                    `user/${userId}/favorites/ids`
                );
                const data = await response.data;
                SetIsLoadingFavoritesIDs(false);
                setUserFavoritesIDs(data);
            } catch (error) {
                console.log(error);
                SetIsLoadingFavoritesIDs(false);
            }
        }
        else{
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
