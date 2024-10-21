import SectionDivider from '../../ui/layout/SectionDivider';
import BaseFormsInfo from '../pricing/BaseFormsInfo';
import { InputFormsEdit } from '../../ui/forms/InputFormsEdit';
import { PriceDetailsSelector } from '../pricing/PriceDetailsSelector';
import { useState } from 'react';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';

export function BareLandForm({ transactionType, fillData, fillUtilities, initialData }) {
    const [waterAccess, setWaterAccess] = useState(initialData?.waterAccess || false);
    const [electricityAccess, setElectricityAccess] = useState(initialData?.electricityAccess || false);

    const handleWaterAccess = (value) => {
        setWaterAccess(value);
    };

    const handleElectricityAccess = (value) => {
        setElectricityAccess(value);
    };

    return (
        <div>
            <SectionDivider text="Bare Land details" />
            <BaseFormsInfo fillData={fillData} initialData={initialData} />
            <div className="grid grid-cols-2 gap-4 my-4">
                <InputFormsEdit
                    inputName="size"
                    inputId="size"
                    type="number"
                    labelText="Size"
                    placeholder="Property size in square meters"
                    onChange={(value) => {
                        fillData('size_in_m2', value);
                    }}
                    min={0}
                    value={initialData?.size_in_m2 ?? ''}
                />
            </div>

            <SectionDivider text="Available services" />
            <div className="grid grid-cols-2 gap-4 my-4">
                <SecondaryFilterTag
                    text={'Water Access'}
                    groupType={'individual'}
                    isActivate={initialData?.waterAccess ?? false}
                    idValue={8}
                    handleSelectedValue={fillUtilities}
                    manageExternalState={handleWaterAccess}
                />
                <SecondaryFilterTag
                    text={'Electricity Access'}
                    groupType={'individual'}
                    isActivate={initialData?.electricityAccess ?? false}
                    idValue={9}
                    handleSelectedValue={fillUtilities}
                    manageExternalState={handleElectricityAccess}
                />
            </div>

            {(waterAccess || electricityAccess) && (
                <>
                    {(transactionType === 2 || transactionType === 3) && (
                        <>
                            <SectionDivider text="Include services" />
                            <div className="grid grid-cols-2 gap-4 my-4">
                                {waterAccess && (
                                    <SecondaryFilterTag
                                        text={'Water'}
                                        groupType={'individual'}
                                        isActivate={initialData?.services?.includes(2)}
                                        idValue={2}
                                        handleSelectedValue={fillUtilities}
                                    />
                                )}
                                {electricityAccess && (
                                    <>
                                        <SecondaryFilterTag
                                            text={'Electricity'}
                                            groupType={'individual'}
                                            isActivate={initialData?.services?.includes(1)}
                                            idValue={1}
                                            handleSelectedValue={fillUtilities}
                                        />
                                        <SecondaryFilterTag
                                            text={'Wifi'}
                                            groupType={'individual'}
                                            isActivate={initialData?.services?.includes(4)}
                                            idValue={4}
                                            handleSelectedValue={fillUtilities}
                                        />
                                        <SecondaryFilterTag
                                            text={'Cable'}
                                            groupType={'individual'}
                                            isActivate={initialData?.services?.includes(5)}
                                            idValue={5}
                                            handleSelectedValue={fillUtilities}
                                        />
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
            <PriceDetailsSelector
                transactionType={transactionType}
                fillData={fillData}
                initialData={initialData} // Añadir initialData si es necesario
            />
        </div>
    );
}
