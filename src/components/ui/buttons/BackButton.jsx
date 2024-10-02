import { MainButton } from "./MainButton";
import { ChevronLeft } from "lucide-react";
import PropTypes from "prop-types";

export function BackButton() {

  const goBack = () => {
    window.history.back(); 
  };

  return (
    <div className="flex flex-row items-center">
      <MainButton
        text=""
        type="button"      
        onClick={goBack}  
        variant="border"
        customClass="p-2 w-3 text-secondary grid justify-center align-center"
        icon={<ChevronLeft />}
      />
      <p className="ml-3 text-secondary font-medium text-lg">Go Back</p>
    </div>
  );
}

BackButton.propTypes = {
  text: PropTypes.string, 
};

export default BackButton;
