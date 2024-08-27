import { PropTypes } from 'prop-types';


export function Input({inputName, placeholder="", type = 'text', spanText="", labelText,inputId, required = false}){
    return(
        <div className="flex flex-col">
            <label htmlFor={`${inputId}`} className="span">{labelText}</label>
            {/* se aplica una condicional para activar el atributo require del input */}
            {/* si el parametro required es true se activa el atributo */}
            {/* "&&" operador logico de jS que permite hacer evaluaciones condicionales*/}
            <input {...(required && { required: true })} type={`${type}`} id={`${inputId}`} name={`${inputName}`} placeholder={`${placeholder}`} className="border border-light-grey rounded-md min-h-8 px-4 py-2 mt-2 focus:outline-light-blue"/>
            <span>{spanText}</span>
        </div>
    )
}

Input.propTypes = {
    inputName: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    spanText: PropTypes.string,
    inputId: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    required: PropTypes.string
}