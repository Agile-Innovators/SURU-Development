import { InputForms } from "../../ui/InputForms";

export function PartnerIntegrationRequestForm() {
  return (
    <div>
      <InputForms
        inputName="Company Name"
        inputId="Company Name"
        type="text"
        labelText="Company Name"
        placeholder="Property size in square meters"
      />
    </div>
  );
}