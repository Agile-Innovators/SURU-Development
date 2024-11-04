import { useNavigate } from 'react-router-dom';
import {ROUTE_PATHS} from '../../routes/index.js';

export const forceLightMode = () => {
    document.documentElement.classList.add('light');  // Activa explícitamente el modo claro
    document.documentElement.classList.remove('dark'); // Elimina el modo oscuro, si está presente
    localStorage.setItem('theme', 'light');  // Guarda el tema en 'light' para persistir
};

export const formatPrice = (price) => {
    if (price >= 1e9) return `${(price / 1e9).toFixed(1)}B`;
    if (price >= 1e6) return `${(price / 1e6).toFixed(1)}M`;
    if (price >= 1e3) return `${(price / 1e3).toFixed(1)}K`;
    return price.toString();
};

export const useShowProperty = (id) => {
    const navigate = useNavigate();

    const showProperty = (id) => {
        navigate(`${ROUTE_PATHS.PROPERTY_DETAILS.replace(':propertyId', id)}`);
    };

    return showProperty;
};