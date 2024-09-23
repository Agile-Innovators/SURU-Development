import { InputForms } from "./InputForms";

export function BaseFormsInfo() {
  return (
    <div className="flex flex-col">
      
        <div>
          <InputForms
            inputName="title"
            inputId="title"
            labelText="Title"
            placeholder="Enter the title"
            required={true}
            inputHeight="h-12" // Altura normal para el título
          />
        </div>
        <div className="mt-4">
          <InputForms
            inputName="Address"
            inputId="Address"
            labelText="Address"
            placeholder="Enter the address"
            customClass=""
          />
        </div>
        <div className="mt-4">
          <InputForms
            inputName="description"
            inputId="description"
            labelText="Description"
            placeholder="Enter the description"
            customClass=""
            isTextarea={true}
            inputHeight="h-32"
          />
        </div>
      
    </div>
  );
}

export default BaseFormsInfo;
