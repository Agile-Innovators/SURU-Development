// src/components/activity/forms/HDSForm.jsx
import SectionDivider from '../../ui/layout/SectionDivider';
import BaseFormsInfo from '../pricing/BaseFormsInfo';
import { InputForms } from '../../ui/forms/InputForms';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';
import { PriceDetailsSelector } from '../pricing/PriceDetailsSelector';
import PropTypes from 'prop-types';

const HDSForm = ({
    title,
    transactionType,
    fillData,
    fillUtilities,
    initialData,
}) => {

    console.log('HDSForm initialData:', initialData); // Para depuración

    return (
        <div>
            <SectionDivider text={title} />
            <BaseFormsInfo fillData={fillData} initialData={initialData} />
            <div className="grid grid-cols-2 gap-4 my-4">
                <InputForms
                    inputName="bedrooms"
                    inputId="bedroomsInput"
                    type="number"
                    labelText="Bedrooms"
                    onChange={(value) => fillData('bedrooms', value)}
                    required={true}
                    min={0}
                    max={15}
                    value={initialData?.bedrooms ?? ''}
                />
                <InputForms
                    inputName="bathrooms"
                    inputId="bathroomsInput"
                    type="number"
                    labelText="Bathrooms"
                    onChange={(value) => fillData('bathrooms', value)}
                    required={true}
                    min={0}
                    max={15}
                    value={initialData?.bathrooms ?? ''}
                />
                <InputForms
                    inputName="floors"
                    inputId="floorsInput"
                    type="number"
                    labelText="Floor"
                    onChange={(value) => fillData('floors', value)}
                    required={true}
                    min={0}
                    max={3}
                    value={initialData?.floors ?? ''}
                />
                <InputForms
                    inputName="pools"
                    inputId="poolsInput"
                    type="number"
                    labelText="Pools"
                    onChange={(value) => fillData('pools', value)}
                    required={true}
                    min={0}
                    max={3}
                    value={initialData?.pools ?? ''}
                />
                <InputForms
                    inputName="garages"
                    inputId="garagesInput"
                    type="number"
                    labelText="Garage"
                    onChange={(value) => fillData('garages', value)}
                    required={true}
                    min={0}
                    max={3}
                    value={initialData?.garages ?? ''}
                />
                <InputForms
                    inputName="size_in_m2"
                    inputId="sizeInput"
                    type="number"
                    labelText="Size"
                    placeholder="Property size in square meters"
                    onChange={(value) => fillData('size_in_m2', value)}
                    required={true}
                    min={0}
                    value={initialData?.size_in_m2 ?? ''}
                />

                <SecondaryFilterTag
                    id={'petsAllowedInput'}
                    text={'Pets allowed'}
                    groupType={'individual'}
                    isActivate={initialData?.pets_allowed === 1} // Comparar con número
                    fillData={(value) => fillData('pets_allowed', value)}
                />
                <SecondaryFilterTag
                    text={'Green Area'}
                    groupType={'individual'}
                    isActivate={initialData?.green_area === 1} // Comparar con número
                    fillData={(value) => fillData('green_area', value)}
                />
                <SecondaryFilterTag
                    text={'Furnished'}
                    handleSelectedValue={fillUtilities}
                    groupType={'individual'}
                    isActivate={initialData?.furnished === 1} // Comparar con número
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
                            isActivate={initialData?.services?.includes(1)}
                            idValue={1}
                        />
                        <SecondaryFilterTag
                            text={'Water'}
                            handleSelectedValue={fillUtilities}
                            groupType={'individual'}
                            isActivate={initialData?.services?.includes(2)}
                            idValue={2}
                        />
                        <SecondaryFilterTag
                            text={'Wifi'}
                            handleSelectedValue={fillUtilities}
                            groupType={'individual'}
                            isActivate={initialData?.services?.includes(4)}
                            idValue={4}
                        />
                        <SecondaryFilterTag
                            text={'Cable TV'}
                            handleSelectedValue={fillUtilities}
                            groupType={'individual'}
                            isActivate={initialData?.services?.includes(5)}
                            idValue={5}
                        />
                    </div>
                </>
            )}
            <PriceDetailsSelector
                transactionType={transactionType}
                fillData={fillData}
                initialData={initialData} // Si PriceDetailsSelector necesita datos iniciales
            />
        </div>
    );
};

HDSForm.propTypes = {
    title: PropTypes.string.isRequired,
    transactionType: PropTypes.number.isRequired,
    fillData: PropTypes.func.isRequired,
    fillUtilities: PropTypes.func.isRequired,
    initialData: PropTypes.object, // Añadido
};

export default HDSForm;
