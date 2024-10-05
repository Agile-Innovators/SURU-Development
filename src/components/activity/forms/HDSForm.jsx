import SectionDivider from "../../ui/layout/SectionDivider";
import BaseFormsInfo from "../pricing/BaseFormsInfo";
import { InputForms } from "../../ui/forms/InputForms";
import { SecondaryFilterTag } from "../../ui/buttons/SecondaryFilterTag";
import { PriceDetailsSelector } from "../pricing/PriceDetailsSelector";
import { useEffect } from "react";

const HDSForm = ({
    title,
    transactionType,
    fillData,
    fillUtilities,
}) => {
    useEffect(()=>{
        if(fillData){
            fillData("pets_allowed", '0') 
            fillData("green_area", '0')
        }
    },[])
    return (
        <div>
            <SectionDivider text={title} />
            <BaseFormsInfo fillData={fillData} />
            <div className="grid grid-cols-2 gap-4 my-4">
                <InputForms
                    inputName="bedrooms"
                    inputId="bedrooms"
                    type="number"
                    labelText="Bedrooms"
                    onChange={(value) => fillData("bedrooms", value)}
                    required={true}
                />
                <InputForms
                    inputName="bathrooms"
                    inputId="bathrooms"
                    type="number"
                    labelText="Bathrooms"
                    onChange={(value) => fillData("bathrooms", value)}
                    required={true}
                />
                <InputForms
                    inputName="floors"
                    inputId="floors"
                    type="number"
                    labelText="Floor"
                    onChange={(value) => fillData("floors", value)}
                    required={true}
                />
                <InputForms
                    inputName="pools"
                    inputId="pools"
                    type="number"
                    labelText="Pools"
                    onChange={(value) => fillData("pools", value)}
                    required={true}
                />
                <InputForms
                    inputName="garages"
                    inputId="garages"
                    type="number"
                    labelText="Garage"
                    onChange={(value) => fillData("garages", value)}
                    required={true}
                />
                <InputForms
                    inputName="Size"
                    inputId="Size"
                    type="number"
                    labelText="Size"
                    placeholder="Property size in square meters"
                    onChange={(value) => fillData("size_in_m2", value)}
                    required={true}
                />

                <SecondaryFilterTag
                    id={'petsAllowedInput'}
                    text={"Pets allowed"}
                    // handleSelectedValue={fillUtilities}
                    groupType={"individual"}
                    isActivate={false}
                    // idValue={7}
                    fillData={(value) => fillData("pets_allowed", value)}
                />
                <SecondaryFilterTag
                    text={"Green Area"}
                    // handleSelectedValue={fillUtilities}
                    groupType={"individual"}
                    isActivate={false}
                    // idValue={6}
                    fillData={(value) => fillData("green_area", value)}
                />
                <SecondaryFilterTag
                    text={"Furnished"}
                    handleSelectedValue={fillUtilities}
                    groupType={"individual"}
                    isActivate={false}
                    idValue={3}
                />
            </div>
            {/* Transaction type: 2 == rent, 3 == both */}
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

export default HDSForm;
