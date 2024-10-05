import { PropTypes } from "prop-types";

export function Input({
    customClass = "",
    inputName,
    placeholder = "",
    type = "text",
    spanText = "",
    labelText,
    inputId,
    required = false,
    value,
    onChange = () => {},
}) {

    return (
        <div className="flex flex-col">
            <label htmlFor={inputId} className="span">
                {labelText}
            </label>
            {/* se aplica una condicional para activar el atributo require del input */}
            {/* si el parametro required es true se activa el atributo */}
            {/* "&&" operador logico de jS que permite hacer evaluaciones condicionales*/}
            <input
                {...(required && { required: true })}
                type={type}
                id={inputId}
                name={inputName}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`border border-light-grey bg-transparent rounded-md min-h-8 px-4 py-2 mt-2 focus:outline-light-blue ${customClass}`}
            />
            <span className="text-grey text-sm mt-2">{spanText}</span>
        </div>
    );
}

Input.propTypes = {
    inputName: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    spanText: PropTypes.string,
    labelText: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    customClass: PropTypes.string,
    onChange: PropTypes.func,
};
