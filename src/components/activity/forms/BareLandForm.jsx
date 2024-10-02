// BareLandForm.jsx

import React from "react";
import SectionDivider from "../../ui/layout/SectionDivider";
import BaseFormsInfo from "../pricing/BaseFormsInfo";
import { InputForms } from "../../ui/forms/InputForms";
import { MainButton } from "../../ui/buttons/MainButton";
import PriceDetailsSelector from "../pricing/PriceDetailsSelector";

const BareLandForm = ({ accion, services, toggleService, fillData }) => {
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
                        fillData('size', value);
                    }}
                />
            </div>

            {/* Servicios disponibles */}
            <SectionDivider text="Available services" />
            <div className="flex space-x-2">
                {["availableWater", "availableElectricity"].map((service) => (
                    <MainButton
                        key={service}
                        onClick={() => {
                            toggleService(service);
                            fillData(service, !services[service]);
                        }}
                        type="boolean"
                        variant={services[service] ? "fill" : "border"}
                        isChecked={services[service]}
                        customClass="capitalize"
                        text={service.replace("available", "")}
                    />
                ))}
            </div>

            {/* Servicios incluidos, solo visibles si al menos un servicio disponible está activo */}
            {(services.availableWater || services.availableElectricity) && (
                <>
                    {(accion === "rent" || accion === "both") && (
                        <>
                            <SectionDivider text="Include services" />
                            <div className="grid grid-cols-2 gap-4 my-4">
                                {/* Servicio incluido para agua */}
                                {services.availableWater && (
                                    <MainButton
                                        key="water"
                                        onClick={() => {
                                            toggleService("water");
                                            fillData("water", !services["water"]);
                                        }}
                                        type="boolean"
                                        variant={services["water"] ? "fill" : "border"}
                                        isChecked={services["water"]}
                                        customClass="capitalize"
                                        text="Water"
                                    />
                                )}

                                {/* Servicios incluidos para electricidad */}
                                {services.availableElectricity && (
                                    <>
                                        <MainButton
                                            key="electricity"
                                            onClick={() => {
                                                toggleService("electricity");
                                                fillData("electricity", !services["electricity"]);
                                            }}
                                            type="boolean"
                                            variant={services["electricity"] ? "fill" : "border"}
                                            isChecked={services["electricity"]}
                                            customClass="capitalize"
                                            text="Electricity"
                                        />
                                        <MainButton
                                            key="wifi"
                                            onClick={() => {
                                                toggleService("wifi");
                                                fillData("wifi", !services["wifi"]);
                                            }}
                                            type="boolean"
                                            variant={services["wifi"] ? "fill" : "border"}
                                            isChecked={services["wifi"]}
                                            customClass="capitalize"
                                            text="WiFi"
                                        />
                                        <MainButton
                                            key="cable"
                                            onClick={() => {
                                                toggleService("cable");
                                                fillData("cable", !services["cable"]);
                                            }}
                                            type="boolean"
                                            variant={services["cable"] ? "fill" : "border"}
                                            isChecked={services["cable"]}
                                            customClass="capitalize"
                                            text="Cable"
                                        />
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}

            {/* Selector de detalles de precio */}
            <PriceDetailsSelector accion={accion} fillData={fillData} />
        </div>
    );
};

export default BareLandForm;
