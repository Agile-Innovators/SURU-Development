import { InputForms } from "./InputForms";

export function BaseFormsInfo({fillData}) {
  return (
    <div className="flex flex-col">
        <div>
          <InputForms
            inputName="title"
            inputId="title"
            labelText="Title"
            placeholder="Enter the title"
            required={true}
            inputHeight="h-12"
            onChange={(value) => fillData('title', value)} 
          />
        </div>
        <div className="mt-4">
          <InputForms
            inputName="availability_date"
            inputId="availability_date"
            labelText="Date"
            placeholder="availability_date"
            customClass=""
            type="date"
            onChange={(value) => fillData('availability_date', value)} 
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
            onChange={(value) => fillData('description', value)} 
          />
        </div>
    </div>
  );
}

export default BaseFormsInfo;