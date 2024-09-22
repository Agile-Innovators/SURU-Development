import PropTypes from 'prop-types';
import InputForms from './InputForms';
import SectionDivider from './SectionDivider';


const PriceDetails = ({ type }) => {
    return (
      <div>
        <SectionDivider text="Price details" />
        {type === 'Rent' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <InputForms inputName="Rent" inputId="Rent" type="price" labelText="Rent Price" required={true} />
            <InputForms inputName="Deposit" inputId="Deposit" type="price" labelText="Deposit" placeholder='Just if is needed' />
            <InputForms inputName="Duration" inputId="Duration" type="timeframe" labelText="Duration" required={true} />
          </div>
        ) : type === 'Sale' ? (
          <InputForms inputName="Sale" inputId="Sale" type="price" labelText="Sale Price (Total amount)" />
        ) : type === 'Both' ? (
          <div>
            <InputForms inputName="Rent" inputId="Rent" type="price" labelText="Rent Price" required={true} />
            <InputForms inputName="Deposit" inputId="Deposit" type="price" labelText="Deposit" placeholder='Just if is needed' />
            <div className='col-span-2'>
            <InputForms inputName="Sale" inputId="Sale" type="price" labelText="Sale Price (Total amount)" />
            </div>
            <InputForms inputName="Duration" inputId="Duration" type="timeframe" labelText="Duration" required={true} />
          </div>
        ) : null}
      </div>
    );
  };
  
  PriceDetails.propTypes = {
    type: PropTypes.oneOf(['Rent', 'Sale', 'Both']).isRequired,
  };
  
  export default PriceDetails;