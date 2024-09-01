import PropTypes from 'prop-types';

export function CheckBox({ id, name, label }) {
    return (
        <div>
            <input type="checkbox" name={name} id={id} className="rounded-md text-primary border-2 border-secondary cursor-pointer"/>
            <label htmlFor="remember" className="ml-2 text-grey text-sm">{label}</label>
        </div>
    );
}

export default CheckBox;

CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}
