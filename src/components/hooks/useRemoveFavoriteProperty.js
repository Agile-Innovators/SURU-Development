import { useAxios } from './useAxios';

export function useRemoveFavoriteProperty() {
    const axios = useAxios();
    let userId;

    const removeFavoriteProperty = async (propertyId) =>{
        try {
            const localData = localStorage.getItem('user');
            if (localData ) {
                const userData = JSON.parse(localData);
                userId = userData.id;
            }
            console.log("userId: ", userId, " propertyId: ", propertyId)
            const response = await axios.delete('user/favorites/remove', {
                data:{
                    user_id: userId,
                property_id: propertyId
                }
            });
            const data =  response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return { removeFavoriteProperty }
}