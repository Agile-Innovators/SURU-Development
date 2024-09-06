import { PropTypes } from 'prop-types';

export function RedirectButton({ text, href, variant = 'fill', customClass = "", icon = null }) {

  const variantClasses = {
    fill: 'bg-secondary text-white hover:bg-light-blue hover:text-primary',
    border: 'text-secondary border-2 border-secondary hover:bg-secondary hover:text-white'
  };

  return (
    <a
      href={href}
      className={`flex items-center justify-center w-[41px] h-[41px] rounded-md transition-colors duration-150 cursor-pointer ${variantClasses[variant]} ${customClass}`}
    >
      {icon ? icon : text}
    </a>
  );
}

RedirectButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['fill', 'border']),
  customClass: PropTypes.string,
  icon: PropTypes.node,
};