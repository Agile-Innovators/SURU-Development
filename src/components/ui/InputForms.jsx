import { useState } from 'react';
import PropTypes from 'prop-types';

export function InputForms({
    inputName,
    placeholder = '',
    type = 'text',
    spanText = '',
    labelText,
    inputId,
    customClass = '',
    required = false,
    isTextarea = false,
    inputHeight = 'h-12',
    dropdownType = '', // Nuevo prop para manejar el tipo de dropdown
    onChange,
}) {
    const [priceValue, setPriceValue] = useState('');

    const commonClasses = `border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue ${customClass} ${inputHeight} cursor-pointer`;

    const handleInputChange = (e) => {
        if (onChange) {
            onChange(e.target.value); // Nos aseguramos de que onChange exista antes de invocarlo
        }
    };

    const handlePriceChange = (e) => {
        let value = e.target.value.replace(/,/g, '');
        if (!isNaN(value) && value !== '') {
            value = parseFloat(value).toLocaleString('en-US', {
                maximumFractionDigits: 2,
            });
        }
        setPriceValue(value);
    };

    const combinedOnChange = (e) => {
        handlePriceChange(e); // Primera función
        handleInputChange(e); // Segunda función
    };

    const renderInput = () => {
        if (type === 'boolean') {
            return (
                <select
                    id={inputId}
                    name={inputName}
                    className={`${commonClasses} appearance-none`}
                    defaultValue=""
                    {...(required && { required: true })}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            );
        }

        if (type === 'price') {
            return (
                <div className="flex items-center space-x-2">
                    <select
                        id={`${inputId}-currency`}
                        name={`${inputName}-currency`}
                        className={`${commonClasses} appearance-none w-24`}
                        defaultValue="CRC"
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
                        onChange={combinedOnChange}
                    />
                </div>
            );
        }

        if (type === 'timeframe') {
            return (
                <select
                    id={inputId}
                    name={inputName}
                    className={`${commonClasses} appearance-none`}
                    defaultValue=""
                    {...(required && { required: true })}
                >
                    <option value="" disabled>
                        Select a timeframe
                    </option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            );
        }

        if (isTextarea) {
            return (
                <textarea
                    {...(required && { required: true })}
                    id={inputId}
                    name={inputName}
                    placeholder={placeholder}
                    className={`${commonClasses} text-left`}
                    onChange={handleInputChange}
                />
            );
        }

        return (
            <input
                {...(required && { required: true })}
                type={type}
                id={inputId}
                name={inputName}
                placeholder={placeholder}
                className={commonClasses}
                onChange={handleInputChange}
            />
        );
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={inputId} className="font-medium text-gray-700">
                {labelText}
            </label>
            {renderInput()}
            <span className="text-grey text-sm mt-2">{spanText}</span>
        </div>
    );
}

InputForms.propTypes = {
    inputName: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    spanText: PropTypes.string,
    labelText: PropTypes.string,
    required: PropTypes.bool,
    customClass: PropTypes.string,
    isTextarea: PropTypes.bool,
    inputHeight: PropTypes.string,
    dropdownType: PropTypes.string,
};

export default InputForms;
