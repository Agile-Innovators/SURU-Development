import SectionDivider from '../../ui/layout/SectionDivider';
import BaseFormsInfo from '../pricing/BaseFormsInfo';
import { InputForms } from '../../ui/forms/InputForms';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';
import { PriceDetailsSelector } from '../pricing/PriceDetailsSelector';
import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { globalProvider } from '../../../global/GlobalProvider';

const HDSForm = ({
    title,
    transactionType,
    fillData,
    fillUtilities,
    propertyType,
    clearData,
}) => {
    const { propTypeForm } = useContext(globalProvider);
    console.log('dd');
    useEffect(() => {
        if (fillData) {
            fillData('pets_allowed', '0');
            fillData('green_area', '0');
        }
    }, []);

    return (
        <div>
            <SectionDivider text={title} />
            <BaseFormsInfo fillData={fillData} />
            <div className="grid grid-cols-2 gap-4 my-4">
                <InputForms
                    inputName="bedrooms"
                    inputId="bedroomsInput"
                    type="number"
                    labelText="Bedrooms"
                    onChange={(value) => fillData('bedrooms', value)}
                    required={true}
                />
                <InputForms
                    inputName="bathrooms"
                    inputId="bathroomsInput"
                    type="number"
                    labelText="Bathrooms"
                    onChange={(value) => fillData('bathrooms', value)}
                    required={true}
                />
                <InputForms
                    inputName="floors"
                    inputId="floorsInput"
                    type="number"
                    labelText="Floor"
                    onChange={(value) => fillData('floors', value)}
                    required={true}
                />
                <InputForms
                    inputName="pools"
                    inputId="poolsInput"
                    type="number"
                    labelText="Pools"
                    onChange={(value) => fillData('pools', value)}
                    required={true}
                />
                <InputForms
                    inputName="garages"
                    inputId="garagesInput"
                    type="number"
                    labelText="Garage"
                    onChange={(value) => fillData('garages', value)}
                    required={true}
                />
                <InputForms
                    inputName="Size"
                    inputId="sizeInput"
                    type="number"
                    labelText="Size"
                    placeholder="Property size in square meters"
                    onChange={(value) => fillData('size_in_m2', value)}
                    required={true}
                />

                <SecondaryFilterTag
                    id={'petsAllowedInput'}
                    text={'Pets allowed'}
                    // handleSelectedValue={fillUtilities}
                    groupType={'individual'}
                    isActivate={false}
                    // idValue={7}
                    fillData={(value) => fillData('pets_allowed', value)}
                />
                <SecondaryFilterTag
                    text={'Green Area'}
                    // handleSelectedValue={fillUtilities}
                    groupType={'individual'}
                    isActivate={false}
                    // idValue={6}
                    fillData={(value) => fillData('green_area', value)}
                />
                <SecondaryFilterTag
                    text={'Furnished'}
                    handleSelectedValue={fillUtilities}
                    groupType={'individual'}
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
                            text={'Electricity'}
                            handleSelectedValue={fillUtilities}
                            groupType={'individual'}
                            isActivate={false}
                            idValue={1}
                        />
                        <SecondaryFilterTag
                            text={'Water'}
                            handleSelectedValue={fillUtilities}
                            groupType={'individual'}
                            isActivate={false}
                            idValue={2}
                        />
                        <SecondaryFilterTag
                            text={'Wifi'}
                            handleSelectedValue={fillUtilities}
                            groupType={'individual'}
                            isActivate={false}
                            idValue={4}
                        />
                        <SecondaryFilterTag
                            text={'Cable TV'}
                            handleSelectedValue={fillUtilities}
                            groupType={'individual'}
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

HDSForm.propTypes = {
    title: PropTypes.string.isRequired,
    transactionType: PropTypes.number.isRequired,
    fillData: PropTypes.func.isRequired,
    fillUtilities: PropTypes.func.isRequired,
    propertyType: PropTypes.number.isRequired,
    clearData: PropTypes.func.isRequired,
};

export default HDSForm;
