import { BasicCard } from "../../ui/cards/BasicCard";
const ExtraServiceCategories = [
    {
      title: "Moving Services",
      image: "https://www.svgrepo.com/show/528942/delivery.svg",
    },
    {
      title: "Cleaning Services",
      image: "https://www.svgrepo.com/show/528874/broom.svg",
    },
    {
      title: "Property Maintenance",
      image: "https://www.svgrepo.com/show/529027/home-1.svg",
    },
    {
      title: "Legal Services",
      image: "https://www.svgrepo.com/show/528905/clipboard-list.svg",
    },
    {
      title: "Interior Design",
      image: "https://www.svgrepo.com/show/529120/paint-roller.svg",
    },
    {
      title: "Security Services",
      image: "https://www.svgrepo.com/show/529197/shield-keyhole.svg",
    },
    {
      title: "Insurance Services",
      image: "https://www.svgrepo.com/show/529000/hand-heart.svg",
    },
    {
      title: "Real Estate Agents",
      image: "https://www.svgrepo.com/show/529726/money-bag.svg",
    },
    // {
    //   title: "Storage Services",
    //   image: "https://www.svgrepo.com/show/528877/box.svg",
    // },
];

export function PartnersServiceSelector() {
    return (
        <div className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h3 className="text-base font-semibold leading-7 text-light-blue">Services Categories</h3>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Partner With Us</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Join our platform and offer your services to a broad audience. Affiliated businesses gain visibility and access to potential clients looking for trusted solutions.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center pt-6">
                    {ExtraServiceCategories.map((ExtraServiceCategory, index) => (
                        <BasicCard
                            key={index} 
                            src={ExtraServiceCategory.image}
                            title={ExtraServiceCategory.title}
                            text="10 options"
                            customClass="m-auto bg-slate-50 w-full h-full flex flex-col justify-between"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
