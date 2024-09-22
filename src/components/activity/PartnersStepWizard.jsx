const steps = [
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    },
    {
        title: "Lorem Ipsum",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
    },
    {
        title: "Lorem Ipsum",
        description: "Ut tellus lacus, commodo at lacus ultricies, semper molestie purus. Donec lacinia purus felis, vel viverra nisl tristique nec. Aliquam pharetra tellus nibh, sed gravida odio consequat ac.",
    },
]
export function StepWizard() {

    return(
        <div className="py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h3 className="text-base font-semibold leading-7 text-indigo-600">Complementary Services</h3>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">How does it work</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                        {steps.map((step, index) => (
                            <div className="relative pl-16" key={index}>
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
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