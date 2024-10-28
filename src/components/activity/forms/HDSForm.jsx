import SectionDivider from '../../ui/layout/SectionDivider';
import BaseFormsInfo from '../pricing/BaseFormsInfo';
import { InputFormsEdit } from '../../ui/forms/InputFormsEdit';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';
import { PriceDetailsSelector } from '../pricing/PriceDetailsSelector';
import PropTypes from 'prop-types';

const HDSForm = ({
    title,
    transactionType,
    fillData,
    fillUtilities,
    initialData = {}, // Valor por defecto para evitar undefined
}) => {
    console.log('HDSForm initialData:', initialData); // Para depuración

    // Función para verificar si una utilidad está seleccionada, usando id
    const isUtilitySelected = (utilityId) => {
        return initialData.utilities && initialData.utilities.some((utility) => utility.id === utilityId);
    };

    return (
        <div>
            <SectionDivider text={title} />
            <BaseFormsInfo fillData={fillData} initialData={initialData} />
            <div className="grid grid-cols-2 gap-4 my-4">
                <InputFormsEdit
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
                <InputFormsEdit
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
                <InputFormsEdit
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
                <InputFormsEdit
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
                <InputFormsEdit
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
                <InputFormsEdit
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

                {/* Utilidades con activación automática basada en initialData */}
                <SecondaryFilterTag
                    text={'Pets allowed'}
                    groupType={'individual'}
                    isActivate={initialData?.pets_allowed === 1}
                    fillData={(value) => fillData('pets_allowed', value)}
                />
                <SecondaryFilterTag
                    text={'Green Area'}
                    groupType={'individual'}
                    isActivate={initialData?.green_area === 1}
                    fillData={(value) => fillData('green_area', value)}
                />
                
                <SecondaryFilterTag
                    text={'Furnished'}
                    isActivate={isUtilitySelected(3)}
                    handleSelectedValue={() => fillUtilities(3)}
                    groupType={'individual'}
                    idValue={3}
                />
            </div>

            {(transactionType === 2 || transactionType === 3) && (
                <>
                    <SectionDivider text="Include services" />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <SecondaryFilterTag
                            text={'Electricity'}
                            isActivate={isUtilitySelected(1)}
                            handleSelectedValue={() => fillUtilities(1)}
                            groupType={'individual'}
                            idValue={1}
                        />
                        <SecondaryFilterTag
                            text={'Water'}
                            isActivate={isUtilitySelected(5)}
                            handleSelectedValue={() => fillUtilities(5)}
                            groupType={'individual'}
                            idValue={2}
                        />
                        <SecondaryFilterTag
                            text={'Wifi'}
                            isActivate={isUtilitySelected(4)}
                            handleSelectedValue={() => fillUtilities(4)}
                            groupType={'individual'}
                            idValue={4}
                        />
                        <SecondaryFilterTag
                            text={'Cable TV'}
                            isActivate={isUtilitySelected(6)}
                            handleSelectedValue={() => fillUtilities(6)}
                            groupType={'individual'}
                            idValue={5}
                        />
                    </div>
                </>
            )}

            <PriceDetailsSelector
                transactionType={transactionType}
                fillData={fillData}
                initialData={initialData}
            />
        </div>
    );
};

HDSForm.propTypes = {
    title: PropTypes.string.isRequired,
    transactionType: PropTypes.number.isRequired,
    fillData: PropTypes.func.isRequired,
    fillUtilities: PropTypes.func.isRequired,
    initialData: PropTypes.object,
};

export default HDSForm;
