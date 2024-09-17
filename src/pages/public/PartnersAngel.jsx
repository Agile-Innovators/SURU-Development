import { MainButton } from "./../../components/ui/MainButton";
import { ExtraServices } from "./../../components/activity/ExtraServices";
import { BasicCard } from "./../../components/ui/BasicCard";
import { FAQSection } from "../../components/activity/FAQSection.jsx";



// MUI

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// MUI





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

]



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




export function PartnersAngel() {




  return (
    <div>
      <header className="relative h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/public/PartnersHeroImage.jpg)' }}>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center items-center text-center px-6 py-12 max-w-3xl ">
            <h1 className="text-5xl font-bold mb-4 text-white">Know Our Partners</h1>
            <p className="text-xl mb-8 text-white">Our trusted partners offer top-tier services, making buying, selling, and renting easier for our community.</p>
            <MainButton to="/partners" text="View all" variant="border" customClass="border-white text-white hover:bg-white hover:text-black p-4"></MainButton>
          </div>
        </div>
      </header>
      {/* // ------------------------------------- */}
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
      {/* // ------------------------------------- */}
      <div className="py-20 bg-white  ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h3 className="text-base font-semibold leading-7 text-indigo-600">Complementary Services</h3>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">How does it work</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center pt-6">
            {ExtraServiceCategories.map((ExtraServiceCategory, index) => (
              <BasicCard
                src={ExtraServiceCategory.image}
                title={ExtraServiceCategory.title}
                text="10 options"
                customClass="m-auto bg-slate-50 w-full h-full flex flex-col justify-between"
              />
            ))}
          </div>
        </div>
      </div>
      {/* // ------------------------------------- */}

      <div className="py-20">
        {/* <div className=" flex mx-auto max-w-7xl px-6 lg:px-8"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mx-auto max-w-7xl px-6 lg:px-8">
          <img className="w-full mx-auto order-1 " src="/public/PartnersInfo.jpg" alt="" />
          <div className="mx-auto max-w-2xl lg:text-left md: order-1">
            <h3 className="text-base font-semibold leading-7 text-indigo-600">Do you have a service company?</h3>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Empower Your Business with Our Platform</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Connect with property owners and renters looking for the services you provide. Expand your reach and enjoy exclusive opportunities.</p>
            <MainButton to="/partners" text="Join Us" variant="border" customClass="border-primary mt-6 text-primary hover:bg-primary hover:text-white px-4"></MainButton>
          </div>
        </div>
      </div>
      {/* // ------------------------------------- */}
      <FAQSection/>
    </div>
  );
}