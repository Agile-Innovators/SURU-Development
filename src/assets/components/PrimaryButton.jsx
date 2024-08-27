import { PropTypes } from 'prop-types';

export function PrimaryButton({text, type = 'button',  customClass = ""}){

    return(
        <button type={`${type}`} className={`px-8 py-3 rounded-md bg-secondary text-white transition-colors duration-150 hover:bg-light-blue hover:text-primary ${customClass}`}>
            {text}
        </button>
    )
}

PrimaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    customClass: PropTypes.string
}