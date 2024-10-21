import { useAxios } from './useAxios';

export function useAddFavoriteProperty() {
    const axios = useAxios();
    let userId;

    const addFavoriteProperty = async (propertyId) =>{
        try {
            const localData = localStorage.getItem('user');
            if (localData) {
                const userData = JSON.parse(localData);
                userId = userData.id;
            }
    
            const response = await axios.post('user/favorites/add', {
                
                    user_id: userId,
                    property_id: propertyId
                
            });
            const data =  response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return { addFavoriteProperty }
}
