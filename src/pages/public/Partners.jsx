import { FAQSection } from '../../components/activity/partners_components/FAQSection.jsx';
import { PartnersHero } from '../../components/activity/heroes/PartnersHero.jsx';
import { StepWizard } from '../../components/activity/partners_components/PartnersStepWizard.jsx';
import { PartnersServiceSelector } from '../../components/activity/partners_components/PartnersServiceSelector.jsx';
import { PartnersRedirectToForm } from '../../components/activity/partners_components/PartnersRedirectToForm.jsx';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function Partners() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#FAQs') {
            // Agrega un pequeño retraso para asegurar que el componente esté completamente montado
            setTimeout(() => {
                const section = document.getElementById('FAQs');
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Puedes ajustar el tiempo según sea necesario
        }
    }, [location]);

    return (
        <div>
            <PartnersHero />
            <StepWizard />
            <PartnersServiceSelector />
            <PartnersRedirectToForm />
            <div id='FAQs'>
            <FAQSection id='FAQSection'/>
            </div>
            
        </div>
    );
}
