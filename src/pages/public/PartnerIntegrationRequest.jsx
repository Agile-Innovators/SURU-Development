import { PartnerIntegrationRequestForm } from '../../components/activity/forms/PartnerIntegrationRequestForm';
import { BackButton } from '../../components/ui/buttons/BackButton';
import { SectionDivider } from '../../components/ui/layout/SectionDivider';
import { MainButton } from '../../components/ui/buttons/MainButton';
import { ROUTE_PATHS } from '../../routes';

export function PartnerIntegrationRequest() {

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 gap-2 my-4">
            <BackButton />
            <h2 className="mt-10 text-center sm:text-start">
                Complementary Services Registration Form
            </h2>
            <p className="mt-4 text-center sm:text-start">
                Please fill in all the fields with the required information.
                It&apos;s important to know that your request will be reviewed by the
                Suru team, so approval may take between 2 to 3 days. We
                appreciate your interest!
            </p>
            <SectionDivider />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-7xl">
                <PartnerIntegrationRequestForm />
                <div className="flex flex-col  h-fit text-secondary border-2 border-gray rounded-md p-6 gap-4">
                    <h4>Do you have any questions you&apos;d like to resolve?</h4>
                    <p>
                        Access the Frequently Asked Questions section. You may
                        find the answer here.
                    </p>
                    <a href="/partners#FAQs" className="block text-center px-8 py-3 rounded-md transition-colors duration-150 cursor-pointer bg-secondary text-white hover:bg-light-blue hover:text-white  w-2/4">Go to FAQ</a>
                </div>
            </div>
        </div>
    );
}
