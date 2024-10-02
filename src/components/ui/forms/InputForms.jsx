import { useState } from 'react';
import PropTypes from 'prop-types';

export function InputForms({
  inputName,
  placeholder = "",
  type = 'text',
  spanText = "",
  labelText,
  inputId,
  customClass = "",
  required = false,
  onChange
}) {
  const [inputValue, setInputValue] = useState('');

  const commonClasses = `border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue ${customClass}`;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (onChange) {
      onChange(value);
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
        />
      )}
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
};

export default InputForms;
