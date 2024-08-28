import { PropTypes } from 'prop-types';

export function HeartIcon({customClass = ""}) {
    return (
        <svg
            className={`w-[32px] h-[32px] text-secondary ${customClass}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"

        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
        </svg>
    );
}

HeartIcon.propTypes = {
    customClass: PropTypes.string
}
