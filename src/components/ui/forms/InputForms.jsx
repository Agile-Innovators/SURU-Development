import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { globalProvider } from '../../../global/GlobalProvider';

export function InputForms({
    inputName,
    placeholder = '',
    type = 'text',
    spanText = '',
    labelText,
    inputId,
    customClass = '',
    required = false,
    onChange,
    ...props
}) {
    const { propTypeForm, propTransacTypeForm } = useContext(globalProvider);
    const [inputValue, setInputValue] = useState('');

    const commonClasses = `border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue ${customClass}`;

    const handleInputChange = (e) => {
        let value = e.target.value;
        if (type === 'number') {
            value = value === '' ? '' : Number(value);
        }
        setInputValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    useEffect(() => {
        setInputValue('');
    }, [propTypeForm, propTransacTypeForm]);

    return (
        <div className="flex flex-col">
            <label htmlFor={inputId} className="font-medium text-gray-700">
                {labelText}
            </label>
            {type === 'textarea' ? (
                <textarea
                    {...(required && { required: true })}
                    id={inputId}
                    name={inputName}
                    placeholder={placeholder}
                    className={`${commonClasses} h-32 resize-none`}
                    value={inputValue}
                    onChange={handleInputChange}
                />
            ) : (
                <input
                    {...(required && { required: true })}
                    type={type}
                    id={inputId}
                    name={inputName}
                    placeholder={placeholder}
                    className={commonClasses}
                    value={inputValue}
                    onChange={handleInputChange}
                    {...props}
                />
            )}
            <span className="text-grey text-sm mt-2">{spanText}</span>
        </div>
    );
}

InputForms.propTypes = {
    inputName: PropTypes.string,
    inputId: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    spanText: PropTypes.string,
    labelText: PropTypes.string,
    required: PropTypes.bool,
    customClass: PropTypes.string,
    onChange: PropTypes.func,
    clearInput: PropTypes.func,
};

export default InputForms;
