import PropTypes from "prop-types";
import InputForms from "../../ui/forms/InputForms";
import SectionDivider from "../../ui/layout/SectionDivider";

const PriceDetails = ({ type, fillData }) => {
    return (
        <div>
            <SectionDivider text="Price details" />
            {type === "Rent" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <InputForms
                        inputName="Rent"
                        inputId="Rent"
                        type="price"
                        labelText="Rent Price"
                        required={true}
                        onChange={(value) => fillData('rent_price', value)}
                    />
                    <InputForms
                        inputName="Deposit"
                        inputId="Deposit"
                        type="price"
                        labelText="Deposit"
                        placeholder="Just if is needed"
                        onChange={(value) => fillData('deposit_price', value)}
                    />
                    <InputForms
                        inputName="Duration"
                        inputId="Duration"
                        type="timeframe"
                        labelText="Duration"
                        required={true}
                        // onChange={(value) => fillData('deposit_price', value)}
                    />
                </div>
            ) : type === "Sale" ? (
                <InputForms
                    inputName="Sale"
                    inputId="Sale"
                    type="price"
                    labelText="Sale Price (Total amount)"
                    onChange={(value) => fillData('sale_price', value)}
                />
            ) : type === "Both" ? (
                <div>
                    <InputForms
                        inputName="Rent"
                        inputId="Rent"
                        type="price"
                        labelText="Rent Price"
                        required={true}
                    />
                    <InputForms
                        inputName="Deposit"
                        inputId="Deposit"
                        type="price"
                        labelText="Deposit"
                        placeholder="Just if is needed"
                    />
                    <div className="col-span-2">
                        <InputForms
                            inputName="Sale"
                            inputId="Sale"
                            type="price"
                            labelText="Sale Price (Total amount)"
                        />
                    </div>
                    <InputForms
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
