// src/ui/forms/InputForms.jsx
import PropTypes from 'prop-types';

export function InputFormsEdit({
    inputName,
    placeholder = '',
    type = 'text',
    spanText = '',
    labelText,
    inputId,
    customClass = '',
    required = false,
    onChange,
    value, // Añadido
    ...props
}) {
    const commonClasses = `border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue ${customClass}`;

    const handleInputChange = (e) => {
        let newValue = e.target.value;
        if (type === 'number') {
            newValue = newValue === '' ? '' : Number(newValue);
        }
        if (onChange) {
            onChange(newValue);
        }
    };

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
                    value={value}
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
                    value={value}
                    onChange={handleInputChange}
                    {...props}
                />
            )}
            <span className="text-grey text-sm mt-2">{spanText}</span>
        </div>
    );
}

InputFormsEdit.propTypes = {
    inputName: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    spanText: PropTypes.string,
    labelText: PropTypes.string,
    required: PropTypes.bool,
    customClass: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    clearInput: PropTypes.func,
};

export default InputFormsEdit;
