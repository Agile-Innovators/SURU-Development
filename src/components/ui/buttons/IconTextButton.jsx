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
    fill: "bg-secondary text-white hover:bg-light-blue hover:text-white",
    border: "text-secondary border-2 border-secondary hover:bg-secondary hover:text-white",
  };

  const commonClasses = `flex items-start px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer ${variantClasses[variant]} ${customClass}`;

  const renderContent = () => {
    const textClass = variant === "fill" ? "text-white" : "text-secondary"; // Cambia el color del texto según el variant
    return (
      <div className="flex flex-col items-start">
        {icon && <div className={`${textClass}`}>{icon}</div>} {/* Aplica el color al icono */}
        <span className={`${textClass} mt-1`}>{text}</span> {/* Aplica el color al texto */}
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
      <a href={to} className={commonClasses} target="_blank" rel="noopener noreferrer">
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
  type: PropTypes.oneOf(["button", "link", "external", "submit", "boolean"]).isRequired,
  variant: PropTypes.oneOf(["fill", "border"]),
  customClass: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};
