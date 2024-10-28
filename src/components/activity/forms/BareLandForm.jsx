import SectionDivider from '../../ui/layout/SectionDivider';
import BaseFormsInfo from '../pricing/BaseFormsInfo';
import { InputFormsEdit } from '../../ui/forms/InputFormsEdit';
import { PriceDetailsSelector } from '../pricing/PriceDetailsSelector';
import { useState } from 'react';
import { SecondaryFilterTag } from '../../ui/buttons/SecondaryFilterTag';

export function BareLandForm({ transactionType, fillData, fillUtilities, initialData = {} }) {
    const isUtilitySelected = (utilityId) => {
        return initialData.utilities && initialData.utilities.some((utility) => utility.id === utilityId);
    };

    const [waterAccess, setWaterAccess] = useState(isUtilitySelected(8)); // ID 8 para "Water Access"
    const [electricityAccess, setElectricityAccess] = useState(isUtilitySelected(9)); // ID 9 para "Electricity Access"
    const [services, setServices] = useState({
        water: isUtilitySelected(2),
        electricity: isUtilitySelected(1),
        wifi: isUtilitySelected(4),
        cable: isUtilitySelected(5),
    });

    // Función para actualizar servicios cuando ambos accesos están desactivados
    const resetServices = () => {
        if (!waterAccess && !electricityAccess) {
            setServices({
                water: false,
                electricity: false,
                wifi: false,
                cable: false,
            });
            // Desactiva todos los servicios explícitamente pasando `false`
            fillUtilities(2, false); // Agua
            fillUtilities(1, false); // Electricidad
            fillUtilities(4, false); // Wifi
            fillUtilities(5, false); // Cable
        }
    };

    const handleWaterAccess = (value) => {
        setWaterAccess(value);
        fillUtilities(8, value); // ID 8 para "Water Access"
        if (!value) resetServices(); // Reiniciar servicios si ambos accesos están desactivados
    };

    const handleElectricityAccess = (value) => {
        setElectricityAccess(value);
        fillUtilities(9, value); // ID 9 para "Electricity Access"
        if (!value) resetServices(); // Reiniciar servicios si ambos accesos están desactivados
    };

    const toggleService = (serviceId, serviceName) => {
        setServices((prev) => ({
            ...prev,
            [serviceName]: !prev[serviceName],
        }));
        fillUtilities(serviceId, !services[serviceName]);
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
                    isActivate={waterAccess}
                    idValue={8}
                    handleSelectedValue={handleWaterAccess}
                    manageExternalState={setWaterAccess}
                />
                <SecondaryFilterTag
                    text={'Electricity Access'}
                    groupType={'individual'}
                    isActivate={electricityAccess}
                    idValue={9}
                    handleSelectedValue={handleElectricityAccess}
                    manageExternalState={setElectricityAccess}
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
                                        isActivate={services.water}
                                        idValue={2}
                                        handleSelectedValue={() => toggleService(2, 'water')}
                                    />
                                )}
                                {electricityAccess && (
                                    <>
                                        <SecondaryFilterTag
                                            text={'Electricity'}
                                            groupType={'individual'}
                                            isActivate={services.electricity}
                                            idValue={1}
                                            handleSelectedValue={() => toggleService(1, 'electricity')}
                                        />
                                        <SecondaryFilterTag
                                            text={'Wifi'}
                                            groupType={'individual'}
                                            isActivate={services.wifi}
                                            idValue={4}
                                            handleSelectedValue={() => toggleService(4, 'wifi')}
                                        />
                                        <SecondaryFilterTag
                                            text={'Cable'}
                                            groupType={'individual'}
                                            isActivate={services.cable}
                                            idValue={5}
                                            handleSelectedValue={() => toggleService(5, 'cable')}
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
                initialData={initialData}
            />
        </div>
    );
}
