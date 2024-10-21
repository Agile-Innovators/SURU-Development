import PropTypes from 'prop-types';
import InputForms from '../../ui/forms/InputForms';
import SectionDivider from '../../ui/layout/SectionDivider';
import TimeframeSelect from '../../ui/forms/TimeFrameSelect';
import PriceInputEdit from '../../ui/forms/PriceInputEdit';

const PriceDetails = ({ type, fillData, initialData }) => {
    return (
        <div>
            <SectionDivider text="Price details" />
            {type === 'Rent' ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-4 my-4">
                    <PriceInputEdit
                        inputName="Rent"
                        inputId="Rent"
                        labelText="Rent Price"
                        required={true}
                        initialPrice={initialData.rent_price}
                        initialCurrency={initialData.currency_code}
                        onChange={(value) =>
                            fillData('rent_price', value.price, value.currency)
                        }
                    />
                    <PriceInputEdit
                        inputName="Deposit"
                        inputId="Deposit"
                        labelText="Deposit"
                        placeholder="Just if is needed"
                        initialPrice={initialData.deposit_price}
                        initialCurrency={initialData.currency_code}
                        onChange={(value) =>
                            fillData('deposit_price', value.price, value.currency)
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
                <PriceInputEdit
                    inputName="Sale"
                    inputId="Sale"
                    labelText="Sale Price (Total amount)"
                    initialPrice={initialData.price}
                    initialCurrency={initialData.currency_code}
                    onChange={(value) =>
                        fillData('sale_price', value.price, value.currency)
                    }
                />
            ) : type === 'Both' ? (
                <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-4 my-4">
                    <PriceInputEdit
                        inputName="Rent"
                        inputId="Rent"
                        labelText="Rent Price"
                        required={true}
                        initialPrice={initialData.rent_price}
                        initialCurrency={initialData.currency_code}
                        onChange={(value) =>
                            fillData('rent_price', value.price, value.currency)
                        }
                    />
                    <PriceInputEdit
                        inputName="Deposit"
                        inputId="Deposit"
                        labelText="Deposit"
                        placeholder="Just if is needed"
                        initialPrice={initialData.deposit_price}
                        initialCurrency={initialData.currency_code}
                        onChange={(value) =>
                            fillData('deposit_price', value.price, value.currency)
                        }
                    />
                    <PriceInputEdit
                        inputName="Sale"
                        inputId="Sale"
                        labelText="Sale Price (Total amount)"
                        initialPrice={initialData.price}
                        initialCurrency={initialData.currency_code}
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
    initialData: PropTypes.shape({
        price: PropTypes.string,
        rent_price: PropTypes.string,
        deposit_price: PropTypes.string,
        currency_code: PropTypes.string,
    }).isRequired,
};

export default PriceDetails;
