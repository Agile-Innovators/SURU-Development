import {useContext} from 'react';
import {globalProvider} from '../../global/GlobalProvider.jsx';
import { useNavigate } from 'react-router-dom';
import {ROUTE_PATHS} from '../../routes/index.js';

export const forceLightMode = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
};

export const formatPrice = (price) => {
    if (price >= 1e9) return `${(price / 1e9).toFixed(1)}B`;
    if (price >= 1e6) return `${(price / 1e6).toFixed(1)}M`;
    if (price >= 1e3) return `${(price / 1e3).toFixed(1)}K`;
    return price.toString();
};

export const useShowProperty = () => {
    const { setPropertyID } = useContext(globalProvider);
    const navigate = useNavigate();

    const showProperty = (id) => {
        setPropertyID(id);
        console.log('ID HOME:', id);
        navigate(ROUTE_PATHS.PROPERTY_DETAILS);
    };

    return showProperty;
};