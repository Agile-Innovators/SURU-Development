import { PropTypes } from 'prop-types';

export function BasicCard({ children, src, icon, title, variant, text }) {
  const variantClasses = {
    border: 'text-secondary border-2 border-gray rounded-md p-6',
  };

  return (
    <div className={`flex flex-col  items-center text-center gap-3 w-full ${variantClasses[variant]}`}>
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
  children: PropTypes.node,
  src: PropTypes.string,
  icon: PropTypes.element, 
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['border']),
  text: PropTypes.string.isRequired,
};