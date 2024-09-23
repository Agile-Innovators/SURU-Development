import { FAQSection } from "../../components/activity/FAQSection.jsx";
import { PartnersHero } from "../../components/activity/PartnersHero.jsx";
import { StepWizard } from "../../components/activity/PartnersStepWizard.jsx";
import { PartnersServiceSelector } from "../../components/activity/PartnersServiceSelector.jsx";
import { PartnersRedirectToForm } from "../../components/activity/PartnersRedirectToForm.jsx";

export function PartnersAngel() {
  return (
    <div>
      <PartnersHero />
      <StepWizard />
      <PartnersServiceSelector />
      <PartnersRedirectToForm />
      <FAQSection id="FAQSection"/>
    </div>
  );
}