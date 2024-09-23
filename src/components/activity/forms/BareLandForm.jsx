import React from "react";
import SectionDivider from "../../ui/SectionDivider";
import BaseFormsInfo from "../../ui/BaseFormsInfo";
import { InputForms } from "../../ui/InputForms";
import { MainButton } from "../../ui/MainButton";
import PriceDetails from "../../ui/PriceDetails";

const BareLandForm = ({ accion, services, toggleService, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <SectionDivider text="Bare Land details" />
      <BaseFormsInfo />
      <div className="grid grid-cols-2 gap-4 my-4">
        <InputForms
          inputName="size"
          inputId="size"
          type="number"
          labelText="Size"
          placeholder="Property size in square meters"
        />
      </div>
      <SectionDivider text="Available services" />
      <div className="flex space-x-2">
        {["availableWater", "availableElectricity"].map((service) => (
          <MainButton
            key={service}
            onClick={() => toggleService(service)} // Función para manejar la selección de servicios disponibles
            type="boolean"
            variant="border"
            isChecked={services[service]} // Verifica si el servicio está habilitado
            customClass="capitalize"
            text={service.replace("available", "")} // Mostrar texto sin el prefijo 'available'
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
                    onClick={() => toggleService("water")}
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
                      onClick={() => toggleService("electricity")}
                      type="boolean"
                      variant="border"
                      isChecked={services["electricity"]}
                      customClass="capitalize"
                      text="Electricity"
                    />
                    <MainButton
                      key="wifi"
                      onClick={() => toggleService("wifi")}
                      type="boolean"
                      variant="border"
                      isChecked={services["wifi"]}
                      customClass="capitalize"
                      text="WiFi"
                    />
                    <MainButton
                      key="cable"
                      onClick={() => toggleService("cable")}
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
      
      {/* Mostrar secciones de precios según la acción seleccionada */}
      {accion === "sale" && <PriceDetails type="Sale" />}
      {accion === "rent" && <PriceDetails type="Rent" />}
      {accion === "both" && <PriceDetails type="Both" />}

      {/* Botón para publicar */}
      <MainButton
        text="Publish"
        onClick={handleSubmit}
        type="submit"
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish Property"}
      </MainButton>
    </form>
  );
};

export default BareLandForm;