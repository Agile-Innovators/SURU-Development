import SectionDivider from '../../ui/layout/SectionDivider';
import BaseFormsInfo from '../pricing/BaseFormsInfo';
import  InputFormsEdit  from '../../ui/forms/InputForms';
import { PriceDetailsSelector } from '../pricing/PriceDetailsSelector';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';
import PropTypes from 'prop-types';

const RetailSpaceForm = ({ transactionType, fillData, fillUtilities, initialData }) => {
    return (
        <div>
            <SectionDivider text="Retail Space details" />
            <BaseFormsInfo fillData={fillData} initialData={initialData} />
            <div className="grid grid-cols-2 gap-4 my-4">
                <InputFormsEdit
                    inputName="size"
                    inputId="size"
                    type="number"
                    labelText="Size"
                    placeholder="Property size in square meters"
                    required={true}
                    onChange={(value) => fillData('size_in_m2', value)}
                    min={0}
                    value={initialData?.size_in_m2 ?? ''}
                />
                <InputFormsEdit
                    inputName="bathrooms"
                    inputId="bathrooms"
                    type="number"
                    labelText="Bathrooms"
                    required={true}
                    onChange={(value) => fillData('bathrooms', value)}
                    min={0}
                    max={10}
                    value={initialData?.bathrooms ?? ''}
                />
            </div>
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
                initialData={initialData} // Añadir initialData si es necesario
            />
        </div>
    );
};

RetailSpaceForm.propTypes = {
    transactionType: PropTypes.number.isRequired,
    fillData: PropTypes.func.isRequired,
    fillUtilities: PropTypes.func.isRequired,
    initialData: PropTypes.object, // Añadido
};

export default RetailSpaceForm;
