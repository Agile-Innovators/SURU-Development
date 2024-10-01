import PropTypes from 'prop-types';

export function BooleanInput({
  inputName,
  labelText,
  inputId,
  customClass = "",
  required = false,
  onChange
}) {
  const commonClasses = `border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue ${customClass}`;

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="font-medium text-gray-700">
        {labelText}
      </label>
      <select
        id={inputId}
        name={inputName}
        className={`${commonClasses} appearance-none`}
        defaultValue=""
        {...(required && { required: true })}
        onChange={handleInputChange}
      >
        <option value="" disabled>Select an option</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}

BooleanInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  required: PropTypes.bool,
  customClass: PropTypes.string,
};

export default BooleanInput;