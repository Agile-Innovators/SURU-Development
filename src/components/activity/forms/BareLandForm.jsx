import SectionDivider from "../../ui/layout/SectionDivider";
import BaseFormsInfo from "../pricing/BaseFormsInfo";
import { InputForms } from "../../ui/forms/InputForms";
import { MainButton } from "../../ui/buttons/MainButton";
import { PriceDetailsSelector } from "../pricing/PriceDetailsSelector";
import { useState } from "react";
import { SecondaryFilterTag } from "../../ui/buttons/SecondaryFilterTag";

export function BareLandForm({
    transactionType,
    services,
    toggleService,
    fillData,
    fillUtilities,
}) {
    const [waterAccess, setWaterAccess] = useState(false);
    const [electricityAccess, setElectricityAccess] = useState(false);

    const handleWaterAccess = (value) => {
        setWaterAccess(value);
    };

    const handleElectricityAccess = (value) =>{
      setElectricityAccess(value);
    }

    return (
        <div>
            {/* Detalles básicos de la propiedad */}
            <SectionDivider text="Bare Land details" />
            <BaseFormsInfo fillData={fillData} />
            <div className="grid grid-cols-2 gap-4 my-4">
                <InputForms
                    inputName="size"
                    inputId="size"
                    type="number"
                    labelText="Size"
                    placeholder="Property size in square meters"
                    onChange={(value) => {
                        fillData("size", value);
                    }}
                />
            </div>

            {/* Servicios disponibles */}
            <SectionDivider text="Available services" />
            <div className="grid grid-cols-2 gap-4 my-4">
                <SecondaryFilterTag
                    text={"Water Access"}
                    groupType={"individual"}
                    isActivate={false}
                    idValue={8}
                    handleSelectedValue={fillUtilities}
                    manageExternalState={handleWaterAccess}
                />
                <SecondaryFilterTag
                    text={"Electricity Access"}
                    groupType={"individual"}
                    isActivate={false}
                    idValue={9}
                    handleSelectedValue={fillUtilities}
                    manageExternalState={handleElectricityAccess}
                />
            </div>
            {waterAccess}

            {/* Servicios incluidos, solo visibles si al menos un servicio disponible está activo */}
            {(waterAccess || electricityAccess) && (
                <>
                    {/* Transaction type: 2 = rent, 3 = both */}
                    {(transactionType === 2 || transactionType === 3) && (
                        <>
                            <SectionDivider text="Include services" />
                            <div className="grid grid-cols-2 gap-4 my-4">
                                {/* Servicio incluido para agua */}
                                {waterAccess && (
                                    <SecondaryFilterTag
                                        text={"Water"}
                                        groupType={"individual"}
                                        isActivate={false}
                                        idValue={2}
                                        handleSelectedValue={fillUtilities}
                                    />
                                )}

                                {/* Servicios incluidos para electricidad */}
                                {electricityAccess && (
                                    <>
                                        <SecondaryFilterTag
                                            text={"Electricity"}
                                            groupType={"individual"}
                                            isActivate={false}
                                            idValue={1}
                                            handleSelectedValue={fillUtilities}
                                        />
                                        <SecondaryFilterTag
                                            text={"Wifi"}
                                            groupType={"individual"}
                                            isActivate={false}
                                            idValue={4}
                                            handleSelectedValue={fillUtilities}
                                        />
                                        <SecondaryFilterTag
                                            text={"Cable"}
                                            groupType={"individual"}
                                            isActivate={false}
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
            />
        </div>
    );
}
