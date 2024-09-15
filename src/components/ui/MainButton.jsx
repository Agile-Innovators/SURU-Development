import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function MainButton({
  text,
  type="button",
  to,
  variant = "fill",
  customClass = "",
  icon = null,
  onClick = null
}) {
  const variantClasses = {
    fill: "bg-secondary text-white hover:bg-light-blue hover:text-primary",
    border: "text-secondary border-2 border-secondary hover:bg-secondary hover:text-white",
  };

  const commonClasses = `block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer ${variantClasses[variant]} ${customClass}`;

  if (type === "button") {
    return (
      <button className={commonClasses} onClick={onClick}>
         {icon ? icon : text}
      </button>
    );
  } else if (type === "link") {
    return (
      <Link to={to} className={commonClasses}>
         {icon ? icon : text}
      </Link>
    );
  } else if (type === "external") {
    return (
      <a href={to} className={commonClasses} target="_blank" rel="noopener noreferrer">
         {icon ? icon : text}
      </a>
    );
  } if (type === "submit") {
    return (
      <button className={commonClasses} type="submit">
         {icon ? icon : text}
      </button>
    );
  }

  return null;
}

MainButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string, 
  type: PropTypes.oneOf(["button", "link", "external"]).isRequired, 
  variant: PropTypes.oneOf(["fill", "border"]),
  customClass: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};
