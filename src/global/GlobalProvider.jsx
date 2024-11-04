import { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const globalProvider = createContext();

export function GlobalProvider({ children }) {
    const [isFilterUsed, setIsFilterUsed] = useState(false);
    const [regionId, setRegionId] = useState(2);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [propertyTypeId, setPropertyTypeId] = useState('');
    const [propTypeForm, setPropTypeForm] = useState();
    const [propTransacTypeForm, setPropTransacTypeForm] = useState();
    const [propertyID, setPropertyID] = useState('');
    const [partnerID, setPartnerID] = useState('');

    return (
        <globalProvider.Provider
            value={{
                regionId,
                setRegionId,
                minPrice,
                setMinPrice,
                maxPrice,
                setMaxPrice,
                propertyTypeId,
                setPropertyTypeId,
                isFilterUsed,
                setIsFilterUsed,
                propTypeForm,
                setPropTypeForm,
                propTransacTypeForm,
                setPropTransacTypeForm,
                propertyID,
                setPropertyID,
                partnerID,
                setPartnerID,
            }}
        >
            {children}
        </globalProvider.Provider>
    );
}
