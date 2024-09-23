import React from "react";
import SectionDivider from "../../ui/SectionDivider";
import BaseFormsInfo from "../../ui/BaseFormsInfo";
import { InputForms } from "../../ui/InputForms";
import { MainButton } from "../../ui/MainButton";
import PriceDetails from "../../ui/PriceDetails";

const RetailSpaceForm = ({ accion, services, toggleService, handleSubmit, loading }) => {
  return (
    <div>
      <SectionDivider text="Retail Space details" />
      <BaseFormsInfo />
      <div className="grid grid-cols-2 gap-4 my-4">
        <InputForms
          inputName="size"
          inputId="size"
          type="number"
          labelText="Size"
          placeholder="Property size in square meters"
        />
        <InputForms
          inputName="bathrooms"
          inputId="bathrooms"
          type="number"
          labelText="Bathrooms"
        />
      </div>
      {(accion === "rent" || accion === "both") && (
        <>
          <SectionDivider text="Include services" />
          <div className="grid grid-cols-2 gap-4 my-4">
            {["water", "electricity", "wifi", "cable"].map((service) => (
              <MainButton
                key={service}
                onClick={() => toggleService(service)}
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
      {accion === "sale" && <PriceDetails type="Sale" />}
      {accion === "rent" && <PriceDetails type="Rent" />}
      {accion === "both" && <PriceDetails type="Both" />}
      {/* <MainButton
        text="Publish"
        onClick={handleSubmit}
        type="submit"
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish Property"}
      </MainButton> */}
    </div>
  );
};

export default RetailSpaceForm;
