import PropTypes from "prop-types";
import InputForms from "../../ui/forms/InputForms";
import SectionDivider from "../../ui/layout/SectionDivider";
import TimeframeSelect from "../../ui/forms/TimeFrameSelect";
import PriceInput from "../../ui/forms/PriceInput";

const PriceDetails = ({ type, fillData }) => {
    return (
        <div>
            <SectionDivider text="Price details" />
            {type === "Rent" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <PriceInput
                        inputName="Rent"
                        inputId="Rent"
                        type="price"
                        labelText="Rent Price"
                        required={true}
                        onChange={(value) => fillData('rent_price', value)}
                    />
                    <PriceInput
                        inputName="Deposit"
                        inputId="Deposit"
                        type="price"
                        labelText="Deposit"
                        placeholder="Just if is needed"
                        onChange={(value) => fillData('deposit_price', value)}
                    />
                    <TimeframeSelect
                        inputName="Duration"
                        inputId="Duration"
                        type="timeframe"
                        labelText="Duration"
                        required={true}
                    />
                </div>
            ) : type === "Sale" ? (
                <PriceInput
                    inputName="Sale"
                    inputId="Sale"
                    type="price"
                    labelText="Sale Price (Total amount)"
                    onChange={(value) => fillData('sale_price', value)}
                />
            ) : type === "Both" ? (
                <div>
                    <PriceInput
                        inputName="Rent"
                        inputId="Rent"
                        type="price"
                        labelText="Rent Price"
                        required={true}
                        onChange={(value) => fillData('rent_price', value)}
                    />
                    <PriceInput
                        inputName="Deposit"
                        inputId="Deposit"
                        type="price"
                        labelText="Deposit"
                        placeholder="Just if is needed"
                        onChange={(value) => fillData('deposit_price', value)}
                    />
                    <div className="col-span-2">
                        <PriceInput
                            inputName="Sale"
                            inputId="Sale"
                            type="price"
                            labelText="Sale Price (Total amount)"
                            onChange={(value) => fillData('sale_price', value)}
                        />
                    </div>
                    <TimeframeSelect
                        inputName="Duration"
                        inputId="Duration"
                        type="timeframe"
                        labelText="Duration"
                        required={true}
                    />
                </div>
            ) : null}
        </div>
    );
};

PriceDetails.propTypes = {
    type: PropTypes.oneOf(["Rent", "Sale", "Both"]).isRequired,
};

export default PriceDetails;
