import { PartnerIntegrationRequestForm } from "../../components/activity/forms/PartnerIntegrationRequestForm";
import { BackButton } from "../../components/ui/BackButton";
import { SectionDivider } from "../../components/ui/SectionDivider";
export function PartnerIntegrationRequest() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-2 mt-4">
        <BackButton />
        <h2 className="mt-10 text-center sm:text-start">Complementary Services Registration Form</h2>
        <SectionDivider/>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mx-auto max-w-7xl">
          <PartnerIntegrationRequestForm />
        </div>
        
    </div>
  );
}