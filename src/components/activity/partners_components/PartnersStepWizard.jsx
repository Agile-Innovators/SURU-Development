import { TextLink } from "../../ui/navigation/TextLink.jsx";
import { ROUTE_PATHS } from "../../../routes/index.js";

const steps = [
    {
        title: "Submit Your Application & Wait for Approval",
        description: (
            <>
                Fill out our <TextLink customClass="underline" route={ROUTE_PATHS.PARTNER_INTEGRATION_REQUEST} text="affiliate request form" /> and wait for us to contact you. We may request additional details before final approval.
            </>
        ),
    },
    {
        title: "Choose Your Subscription Plan",
        description: "After approval, select your subscription to activate your account. Plans start at $15 per month to offer services on our platform.",
    },
    {
        title: "Access Your Account",
        description: "Once your payment is complete, you'll receive login credentials. Sign in to personalize your profile and add your services for clients to see.",
    }
];

export function StepWizard() {

    return(
        <div className="py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h3 className="text-base font-semibold leading-7 text-light-blue">Partner With Us</h3>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">How does it work</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                        {steps.map((step, index) => (
                            <div className="relative pl-16" key={index}>
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0c9dc1]">
                                        <span className="text-white">{index + 1}</span>
                                    </div>
                                    {step.title}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{step.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}