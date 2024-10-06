import { PropTypes } from 'prop-types';

export function ActionButton({
    text,
    id,
    type = '',
    variant = 'fill',
    customClass = '',
}) {
    const variantClasses = {
        fill: 'bg-secondary text-white hover:bg-light-blue hover:text-primary',
        border: 'text-secondary border-2 border-secondary hover:bg-secondary hover:text-white',
    };

    return (
        <button
            type={type}
            id={id}
            className={`block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer ${variantClasses[variant]} ${customClass}`}
        >
            {text}
        </button>
    );
}

ActionButton.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.oneOf(['fill', 'border']).isRequired,
    customClass: PropTypes.string,
};
