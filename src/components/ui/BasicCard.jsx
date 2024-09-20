import { PropTypes } from "prop-types";

//el parametro children permite que ESTE componente reciba una etiqueta html u otro componente de react
//para que este componente reciba un children, debe de tener un etiqueta de apertura y cierre cuando se instancia
export function BasicCard({
  children,
  src,
  title,
  variant,
  text,
  customClass = "",
  icon,
}) {
  const variantClasses = {
    border: "text-secondary border-2 border-gray rounded-md p-6",
  };
  return (
    <div

      className={`flex flex-col items-center text-center gap-3 p-4 border border-light-grey rounded-md transition-all duration-100 hover:shadow-md hover:scale-105 ${customClass} ${variantClasses[variant]}`}

    >
      {icon ? (
        <div className="icon w-24 h-24">{icon}</div>
      ) : (
        <img className="w-24 h-24" src={src} alt="image card" />
      )}
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}

BasicCard.propTypes = {
    children: PropTypes.children,
    src: PropTypes.string,
    title: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["border"]),
    text: PropTypes.string.isRequired,
    customClass: PropTypes.string,
    icon: PropTypes.element,

};

