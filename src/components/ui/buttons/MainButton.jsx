// MainButton.jsx

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function MainButton({
    text,
    type = 'button',
    to,
    variant = 'fill',
    customClass = '',
    icon = null,
    onClick = () => {},
    isChecked = false,
    id = null, // Nueva prop de id
}) {
    let variantClasses = {
        fill: 'bg-secondary text-white hover:bg-light-blue hover:text-white',
        border: 'text-secondary border-2 border-secondary hover:bg-secondary hover:text-white dark:border-light-blue dark:text-light-blue',
        none: '',
    };

    let commonClasses = `block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer ${variantClasses[variant]} ${customClass}`;

    //manejar el onClick mÃ¡s dinamico ya que no permite agreagr otras funciones
    // const handleClick = () => {
    //   if (onClick) {
    //     onClick(id); // Retorna el id al hacer clic
    //   }
    // };

    if (type === 'button') {
        return (
            <button
                id={id}
                className={commonClasses}
                onClick={onClick}
                type="button"
            >
                {icon ? icon : text}
            </button>
        );
    } else if (type === 'link') {
        return (
            <Link id={id} to={to} className={commonClasses} onClick={onClick}>
                {icon ? icon : text}
            </Link>
        );
    } else if (type === 'external') {
        return (
            <a
                id={id}
                href={to}
                className={commonClasses}
                target="_blank"
                rel="noopener noreferrer"
            >
                {icon ? icon : text}
            </a>
        );
    } else if (type === 'submit') {
        return (
            <button id={id} className={commonClasses} type="submit">
                {icon ? icon : text}
            </button>
        );
    } else if (type === 'boolean') {
        const booleanVariant = isChecked ? 'fill' : 'border';
        return (
            <button
                id={id}
                className={`${commonClasses} ${variantClasses[booleanVariant]}`}
                onClick={handleClick}
                type="button"
            >
                {text}
            </button>
        );
    }

    return null;
}

MainButton.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string,
    type: PropTypes.oneOf(['button', 'link', 'external', 'submit', 'boolean'])
        .isRequired,
    variant: PropTypes.oneOf(['fill', 'border']),
    customClass: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
    isChecked: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Propiedad de id agregada
};