import { PropTypes } from 'prop-types';
export function SectionDivider({ text = '' }) {
    return (
        <div className="text-center sm:text-start">
            <hr
                className={`border-t-2 border-light-grey w-auto my-4 rounded-lg`}
            />
            <h2 className="text-secondary font-normal mb-5">{text}</h2>
        </div>
    );
}

SectionDivider.propTypes = {
    text: PropTypes.string,
};

export default SectionDivider;
