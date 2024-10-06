import PropTypes from 'prop-types';
import InputForms from '../../ui/forms/InputForms';
import SectionDivider from '../../ui/layout/SectionDivider';
import TimeframeSelect from '../../ui/forms/TimeFrameSelect';
import PriceInput from '../../ui/forms/PriceInput';

const PriceDetails = ({ type, fillData }) => {
    return (
        <div>
            <SectionDivider text="Price details" />
            {type === 'Rent' ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-4 my-4">
                    <PriceInput
                        inputName="Rent"
                        inputId="Rent"
                        labelText="Rent Price"
                        required={true}
                        onChange={(value) =>
                            fillData('rent_price', value.price, value.currency)
                        }
                    />
                    <PriceInput
                        inputName="Deposit"
                        inputId="Deposit"
                        labelText="Deposit"
                        placeholder="Just if is needed"
                        onChange={(value) =>
                            fillData(
                                'deposit_price',
                                value.price,
                                value.currency
                            )
                        }
                    />
                    <TimeframeSelect
                        inputName="Duration"
                        inputId="Duration"
                        labelText="Duration"
                        required={true}
                        onChange={(value) => fillData('timeframe', value)}
                    />
                </div>
            ) : type === 'Sale' ? (
                <PriceInput
                    inputName="Sale"
                    inputId="Sale"
                    labelText="Sale Price (Total amount)"
                    onChange={(value) =>
                        fillData('sale_price', value.price, value.currency)
                    }
                />
            ) : type === 'Both' ? (
                <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-4 my-4">
                    <PriceInput
                        inputName="Rent"
                        inputId="Rent"
                        labelText="Rent Price"
                        required={true}
                        onChange={(value) =>
                            fillData('rent_price', value.price, value.currency)
                        }
                    />
                    <PriceInput
                        inputName="Deposit"
                        inputId="Deposit"
                        labelText="Deposit"
                        placeholder="Just if is needed"
                        onChange={(value) =>
                            fillData(
                                'deposit_price',
                                value.price,
                                value.currency
                            )
                        }
                    />
                    <PriceInput
                        inputName="Sale"
                        inputId="Sale"
                        labelText="Sale Price (Total amount)"
                        onChange={(value) =>
                            fillData('sale_price', value.price, value.currency)
                        }
                    />
                    <TimeframeSelect
                        inputName="Duration"
                        inputId="Duration"
                        labelText="Duration"
                        required={true}
                        onChange={(value) => fillData('timeframe', value)}
                    />
                </div>
            ) : null}
        </div>
    );
};

PriceDetails.propTypes = {
    type: PropTypes.oneOf(['Rent', 'Sale', 'Both']).isRequired,
    fillData: PropTypes.func.isRequired,
};

export default PriceDetails;
