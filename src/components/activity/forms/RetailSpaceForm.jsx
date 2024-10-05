import SectionDivider from "../../ui/layout/SectionDivider";
import BaseFormsInfo from "../pricing/BaseFormsInfo";
import { InputForms } from "../../ui/forms/InputForms";
import { PriceDetailsSelector } from "./../pricing/PriceDetailsSelector";
import { SecondaryFilterTag } from './../../ui/buttons/SecondaryFilterTag';

const RetailSpaceForm = ({
    transactionType,
    fillData,
    fillUtilities,
}) => {
    return (
        <div>
            <SectionDivider text="Retail Space details" />
            <BaseFormsInfo fillData={fillData} />
            <div className="grid grid-cols-2 gap-4 my-4">
                <InputForms
                    inputName="size"
                    inputId="size"
                    type="number"
                    labelText="Size"
                    placeholder="Property size in square meters"
                    onChange={(value) => fillData("size_in_m2", value)}
                />
                <InputForms
                    inputName="bathrooms"
                    inputId="bathrooms"
                    type="number"
                    labelText="Bathrooms"
                    onChange={(value) => fillData("bathrooms", value)}
                />
            </div>
            {/* Transaction type: 2 = rent, 3 = both */}
            {(transactionType === 2 || transactionType === 3) && (
                <>
                    <SectionDivider text="Include services" />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <SecondaryFilterTag
                            text={"Electricity"}
                            handleSelectedValue={fillUtilities}
                            groupType={"individual"}
                            isActivate={false}
                            idValue={1}
                        />
                        <SecondaryFilterTag
                            text={"Water"}
                            handleSelectedValue={fillUtilities}
                            groupType={"individual"}
                            isActivate={false}
                            idValue={2}
                        />
                        <SecondaryFilterTag
                            text={"Wifi"}
                            handleSelectedValue={fillUtilities}
                            groupType={"individual"}
                            isActivate={false}
                            idValue={4}
                        />
                        <SecondaryFilterTag
                            text={"Cable TV"}
                            handleSelectedValue={fillUtilities}
                            groupType={"individual"}
                            isActivate={false}
                            idValue={5}
                        />
                    </div>
                </>
            )}
            <PriceDetailsSelector
                transactionType={transactionType}
                fillData={fillData}
            />
        </div>
    );
};

export default RetailSpaceForm;
