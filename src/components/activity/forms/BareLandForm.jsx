import React from "react";
import SectionDivider from "../../ui/layout/SectionDivider";
import BaseFormsInfo from "../pricing/BaseFormsInfo";
import { InputForms } from "../../ui/forms/InputForms";
import { MainButton } from "../../ui/buttons/MainButton";
import PriceDetailsSelector from "../pricing/PriceDetailsSelector";

const BareLandForm = ({ accion, services, toggleService, fillData }) => {
  return (
    <div>
      <SectionDivider text="Bare Land details" />
      <BaseFormsInfo fillData={fillData} />
      <div className="grid grid-cols-2 gap-4 my-4">
        <InputForms
          inputName="size"
          inputId="size"
          type="number"
          labelText="Size"
          placeholder="Property size in square meters"
          onChange={(value) => fillData('size', value)} // Añadir onChange para el tamaño
        />
      </div>
      <SectionDivider text="Available services" />
      <div className="flex space-x-2">
        {["availableWater", "availableElectricity"].map((service) => (
          <MainButton
            key={service}
            onClick={() => {
              toggleService(service);
              fillData(service, !services[service]); // Envía el estado booleano
            }}
            type="boolean"
            variant="border"
            isChecked={services[service]}
            customClass="capitalize"
            text={service.replace("available", "")}
          />
        ))}
      </div>
      {(services.availableWater || services.availableElectricity) && (
        <>
          {(accion === "rent" || accion === "both") && (
            <>
              <SectionDivider text="Include services" />
              <div className="grid grid-cols-2 gap-4 my-4">
                {services.availableWater && (
                  <MainButton
                    key="water"
                    onClick={() => {
                      toggleService("water");
                      fillData("water", !services["water"]); // Envía el estado booleano
                    }}
                    type="boolean"
                    variant="border"
                    isChecked={services["water"]}
                    customClass="capitalize"
                    text="Water"
                  />
                )}
                {services.availableElectricity && (
                  <>
                    <MainButton
                      key="electricity"
                      onClick={() => {
                        toggleService("electricity");
                        fillData("electricity", !services["electricity"]); // Envía el estado booleano
                      }}
                      type="boolean"
                      variant="border"
                      isChecked={services["electricity"]}
                      customClass="capitalize"
                      text="Electricity"
                    />
                    <MainButton
                      key="wifi"
                      onClick={() => {
                        toggleService("wifi");
                        fillData("wifi", !services["wifi"]); // Envía el estado booleano
                      }}
                      type="boolean"
                      variant="border"
                      isChecked={services["wifi"]}
                      customClass="capitalize"
                      text="WiFi"
                    />
                    <MainButton
                      key="cable"
                      onClick={() => {
                        toggleService("cable");
                        fillData("cable", !services["cable"]); // Envía el estado booleano
                      }}
                      type="boolean"
                      variant="border"
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
      <PriceDetailsSelector accion={accion} fillData={fillData} /> {/* Cambiado para que llame fillData */}
    </div>
  );
};

export default BareLandForm;
