import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function TextLink({ route, text, customClass }) {
    return (
        <Link
            to={route}
            className={`text-secondary font-normal text-sm hover:text-light-blue duration-100 cursor-pointer ${customClass || ''}`}
        >
            {text}
        </Link>
    );
}

export default TextLink;

TextLink.propTypes = {
    route: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    customClass: PropTypes.string,
};

TextLink.defaultProps = {
    route: '/',
    text: 'Link',
    customClass: '',
};
