import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function PriceInput({
    inputName,
    placeholder = '',
    labelText,
    inputId,
    customClass = '',
    required = false,
    onChange,
    initialPrice = '',
    initialCurrency = 'CRC',
}) {
    const [priceValue, setPriceValue] = useState('');
    const [currency, setCurrency] = useState(initialCurrency); // Estado para la moneda

    useEffect(() => {
        // Establece el precio inicial formateado
        if (initialPrice) {
            const formattedPrice = parseFloat(initialPrice).toLocaleString('en-US', {
                maximumFractionDigits: 2,
            });
            setPriceValue(formattedPrice);
        }
    }, [initialPrice]);

    const commonClasses = `border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue ${customClass}`;

    const handleInputChange = (value) => {
        if (onChange) {
            onChange({ price: value, currency });
        }
    };

    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        setCurrency(selectedCurrency);
        handleInputChange(priceValue); // Actualizar con el valor de precio actual
    };

    const handlePriceChange = (e) => {
        let value = e.target.value.replace(/,/g, '');
        const regex = /^\d*\.?\d*$/;
        if (regex.test(value) || value === '') {
            if (value !== '') {
                value = parseFloat(value).toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                });
            }
            setPriceValue(value);
            handleInputChange(value);
        }
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={inputId} className="font-medium text-gray-700">
                {labelText}
            </label>
            <div className="flex items-center space-x-2">
                <select
                    id={`${inputId}-currency`}
                    name={`${inputName}-currency`}
                    className={`${commonClasses} appearance-none w-24`}
                    value={currency}
                    onChange={handleCurrencyChange}
                    {...(required && { required: true })}
                >
                    <option value="CRC">CRC</option>
                    <option value="USD">USD</option>
                </select>
                <input
                    {...(required && { required: true })}
                    type="text"
                    id={inputId}
                    name={inputName}
                    placeholder={placeholder}
                    className={`${commonClasses} flex-1`}
                    value={priceValue}
                    onChange={handlePriceChange}
                />
            </div>
        </div>
    );
}

PriceInput.propTypes = {
    inputName: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    labelText: PropTypes.string,
    required: PropTypes.bool,
    customClass: PropTypes.string,
    onChange: PropTypes.func,
    initialPrice: PropTypes.string,
    initialCurrency: PropTypes.string,
};

export default PriceInput;
