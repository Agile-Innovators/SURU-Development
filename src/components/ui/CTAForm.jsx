import { MainButton } from "./MainButton";
import PropTypes from "prop-types";

export function CTAForm({ title, description, description2, text, type, to }) {
  return (
    <div className="mt-56 border-gray border-2 rounded-lg p-6 md:w-2/5 w-full">
      <h5 className="font-medium">{title}</h5>
      <p className="container mt-3 ">{description}</p>
      {description2 && <p className="container mt-8 ">{description2}</p>}
      <MainButton
        text={text}
        type={type}
        to={to}
        variant="fill"
        customClass="w-full mt-8 p-4"
      />
    </div>
  );
}

CTAForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  description2: PropTypes.string, 
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "link", "external"]).isRequired,
  to: PropTypes.string.isRequired,
};

export default CTAForm;