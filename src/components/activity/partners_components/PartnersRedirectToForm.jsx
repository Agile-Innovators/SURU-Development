import { ROUTE_PATHS } from '../../../routes';
import { MainButton } from '../../ui/buttons/MainButton';

export function PartnersRedirectToForm() {
    return (
        <div className="py-10 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mx-auto max-w-7xl px-6 lg:px-8">
                <img
                    className="w-full mx-auto order-1 "
                    src="/business_deal.svg"
                    alt="Partners"
                />
                <div className="mx-auto max-w-2xl lg:text-left md: order-1">
                    <h3 className="text-base font-semibold leading-7 text-light-blue dark:text-light-blue ">
                        Do you have a service company?
                    </h3>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        Empower Your Business with Our Platform
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-white">
                        Connect with property owners and renters looking for the
                        services you provide. Expand your reach and enjoy
                        exclusive opportunities.
                    </p>
                    <MainButton
                        to={ROUTE_PATHS.PARTNER_INTEGRATION_REQUEST}
                        type="link"
                        text="Join Us"
                        variant="border"
                        customClass="border-primary mt-6 text-primary hover:bg-primary hover:text-white px-4"
                    ></MainButton>
                </div>
            </div>
        </div>
    );
}
