// IconTextButton.jsx

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function IconTextButton({
    text,
    type = "button",
    to,
    variant = "fill",
    customClass = "",
    icon = null,
    onClick = null,
    isChecked = false,
}) {
    const variantClasses = {
        fill: "bg-secondary text-white hover:bg-light-blue md:text-sm",
        border: "border-2 border-secondary text-secondary hover:bg-secondary md:text-sm",
    };

    // Clase común para el color del texto e icono, incluyendo el hover
    const textColorClass = `transition-colors duration-150 ${
        variant === "fill" ? "text-white" : "text-secondary"
    } group-hover:text-white`;

    const commonClasses = `group flex flex-col xl:px-8 py-2 xl:py-3 px-2 py-2 rounded-md transition-colors duration-150 cursor-pointer ${variantClasses[variant]} ${customClass}`;

    const renderContent = () => {
        return (
            <div className="flex flex-col space-y-1">
                {icon && (
                    <div
                        className={`transition-colors duration-150 ${textColorClass}`}
                    >
                        {icon}
                    </div>
                )}
                <span
                    className={`transition-colors duration-150 text-center ${textColorClass}`}
                >
                    {text}
                </span>
            </div>
        );
    };

    if (type === "button") {
        return (
            <button className={commonClasses} onClick={onClick}>
                {renderContent()}
            </button>
        );
    } else if (type === "link") {
        return (
            <Link to={to} className={commonClasses}>
                {renderContent()}
            </Link>
        );
    } else if (type === "external") {
        return (
            <a
                href={to}
                className={commonClasses}
                target="_blank"
                rel="noopener noreferrer"
            >
                {renderContent()}
            </a>
        );
    } else if (type === "submit") {
        return (
            <button className={commonClasses} type="submit">
                {renderContent()}
            </button>
        );
    } else if (type === "boolean") {
        const booleanVariant = isChecked ? "fill" : "border";
        return (
            <button
                className={`${commonClasses} ${variantClasses[booleanVariant]}`}
                onClick={onClick}
                type="button"
            >
                {renderContent()}
            </button>
        );
    }

    return null;
}

IconTextButton.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string,
    type: PropTypes.oneOf(["button", "link", "external", "submit", "boolean"])
        .isRequired,
    variant: PropTypes.oneOf(["fill", "border"]),
    customClass: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
    isChecked: PropTypes.bool,
};
