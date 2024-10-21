import { FAQSection } from '../../components/activity/partners_components/FAQSection.jsx';
import { PartnersHero } from '../../components/activity/heroes/PartnersHero.jsx';
import { StepWizard } from '../../components/activity/partners_components/PartnersStepWizard.jsx';
import { PartnersServiceSelector } from '../../components/activity/partners_components/PartnersServiceSelector.jsx';
import { PartnersRedirectToForm } from '../../components/activity/partners_components/PartnersRedirectToForm.jsx';

export function Partners() {
    return (
        <div>
            <PartnersHero />
            <StepWizard />
            <PartnersServiceSelector />
            <PartnersRedirectToForm />
            <FAQSection id="FAQSection" />
        </div>
    );
}
