import { InputForms } from "../../ui/InputForms";
import { MainButton } from "../../ui/MainButton";
export function PartnerIntegrationRequestForm() {
  return (
    <form action="" className="flex flex-col w-full gap-2">
      <div className="flex flex-col mb-4">
        <label htmlFor="CompanyName" className="font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          id="CompanyName"
          placeholder="Enter your company name"
          className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="ServiceProvided" className="font-medium text-gray-700">Service Provided</label>
        <input
          type="text"
          id="ServiceProvided"
          placeholder="Describe the service you provide"
          className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="TellUsAboutYourCompany" className="font-medium text-gray-700">Tell Us About Your Company</label>
        <textarea
          id="TellUsAboutYourCompany"
          type="Textarea"
          placeholder="Briefly introduce your company"
          className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-32"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="ContactPhoneNumbers" className="font-medium text-gray-700">Contact Phone Numbers</label>
        <input
          type="tel"
          id="ContactPhoneNumbers"
          placeholder="Enter contact phone numbers"
          className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="EmailAddress" className="font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          id="EmailAddress"
          placeholder="Enter your email address"
          className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="PriceRangeMin" className="font-medium text-gray-700">Price Range (Min.)</label>
        <input
          type="number"
          id="PriceRangeMin"
          placeholder="Enter the minimum price"
          className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="PriceRangeMax" className="font-medium text-gray-700">Price Range (Max.)</label>
        <input
          type="number"
          id="PriceRangeMax"
          placeholder="Enter the maximum price"
          className="border border-light-grey bg-transparent rounded-md px-4 py-3 mt-2 focus:outline-light-blue h-12"
        />
      </div>
      <MainButton
        text="Submit"
        type="submit"
        customClass="w-full sm:w-2/4"
      />
    </form>

  );
}