import React from "react";
import SectionDivider from "../../ui/layout/SectionDivider";
import BaseFormsInfo from "../pricing/BaseFormsInfo";
import { InputForms } from "../../ui/forms/InputForms";
import { MainButton } from "../../ui/buttons/MainButton";
import PriceDetailsSelector from "../pricing/PriceDetailsSelector";

const RetailSpaceForm = ({ accion, services, toggleService, fillData }) => {
  return (
    <div>
      <SectionDivider text="Retail Space details" />
      <BaseFormsInfo fillData={fillData} />
      <div className="grid grid-cols-2 gap-4 my-4">
        <InputForms
          inputName="size"
          inputId="size"
          type="number"
          labelText="Size"
          placeholder="Property size in square meters"
          onChange={(value) => fillData('size', value)} 
        />
        <InputForms
          inputName="bathrooms"
          inputId="bathrooms"
          type="number"
          labelText="Bathrooms"
          onChange={(value) => fillData('bathrooms', value)} 
        />
      </div>
      {(accion === "rent" || accion === "both") && (
        <>
          <SectionDivider text="Include services" />
          <div className="grid grid-cols-2 gap-4 my-4">
            {["water", "electricity", "wifi", "cable"].map((service) => (
              <MainButton
                key={service}
                onClick={() => {
                  toggleService(service);
                  fillData(service, !services[service]); 
                }}
                type="boolean"
                variant="border"
                isChecked={services[service]}
                customClass="capitalize"
                text={service.charAt(0).toUpperCase() + service.slice(1)}
              />
            ))}
          </div>
        </>
      )}
      <PriceDetailsSelector accion={accion} fillData={fillData} /> 
    </div>
  );
};

export default RetailSpaceForm;
