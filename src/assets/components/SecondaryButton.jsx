import { PropTypes } from 'prop-types';

export function SecondaryButton({text, type = '', customClass = ""}){

    return(
        <button type={`${type}`} className={`px-8 py-3 rounded-md text-secondary border-2 border-secondary transition-colors duration-150 hover:bg-secondary hover:text-white ${customClass}`}>
            {text}
        </button>
    )
}

SecondaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    customClass: PropTypes.string
}