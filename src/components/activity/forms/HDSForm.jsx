import React from "react";
import SectionDivider from "../../ui/layout/SectionDivider";
import BaseFormsInfo from "../pricing/BaseFormsInfo";
import { InputForms } from "../../ui/forms/InputForms";
import { MainButton } from "../../ui/buttons/MainButton";
import PriceDetailsSelector from "../pricing/PriceDetailsSelector";
import BooleanInput from "../../ui/forms/BooleanInput";

const HDSForm = ({ accion, services, toggleService, fillData }) => {
  return (
    <div>
      <SectionDivider text="House details" />
      <BaseFormsInfo fillData={fillData} />
      <div className="grid grid-cols-2 gap-4 my-4">
        <InputForms
          inputName="bedrooms"
          inputId="bedrooms"
          type="number"
          labelText="Bedrooms"
          onChange={(value) => fillData('bedrooms', value)}
        />
        <InputForms
          inputName="bathrooms"
          inputId="bathrooms"
          type="number"
          labelText="Bathrooms"
          onChange={(value) => fillData('bathrooms', value)}
        />
        <InputForms
          inputName="floors"
          inputId="floors"
          type="number"
          labelText="Floor"
          onChange={(value) => fillData('floors', value)}
        />
        <InputForms
          inputName="pools"
          inputId="pools"
          type="number"
          labelText="Pools"
          onChange={(value) => fillData('pools', value)}
        />
        <BooleanInput
          inputName="Pets"
          inputId="Pets"
          type="boolean"
          labelText="Pets"
          onChange={(value) => fillData('pets_allowed', value)}
        />
        <BooleanInput
          inputName="GreenArea"
          inputId="GreenArea"
          type="boolean"
          labelText="Green Area"
          onChange={(value) => fillData('green_area', value)}
        />
        <BooleanInput
          inputName="garages"
          inputId="garages"
          type="number"
          labelText="Garage"
          onChange={(value) => fillData('garages', value)}
        />
        <InputForms
          inputName="Size"
          inputId="Size"
          type="number"
          labelText="Size"
          placeholder="Property size in square meters"
          onChange={(value) => fillData('size_in_m2', value)}
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

export default HDSForm;
