import { PropTypes } from "prop-types";

export function RedirectButton({
    text,
    href,
    variant = "fill",
    customClass = "",
}) {
    const variantClasses = {
        fill: "bg-secondary text-white hover:bg-light-blue hover:text-primary",
        border: "text-secondary border-2 border-secondary hover:bg-secondary hover:text-white",
    };

    return (
        <a
            href={href}
            className={`block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer ${variantClasses[variant]} ${customClass}`}
        >
            {text}
        </a>
    );
}

RedirectButton.propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["fill", "border"]),
    customClass: PropTypes.string,
};
