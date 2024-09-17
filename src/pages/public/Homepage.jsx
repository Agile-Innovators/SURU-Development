import { PropertiesFilter } from "../../components/homepage_components/PropertiesFilter";
import { HeaderHome } from "../../components/activity/HeaderHome.jsx";
import { PropertyActionSelection } from "../../components/activity/PropertyActionSelection.jsx";
import { AboutUs } from "../../components/activity/AboutUs.jsx";
import { MainButton } from "./../../components/ui/MainButton";
const partners = [
    {
        name: "ClearPath Solutions",
        title: "Cleaning Services",
        imgSrc: "/LogoExample.webp"
    },
 
    {
        name: "CitiClean & Support",
        title: "Interior Design & Remodeling",
        imgSrc: "/LogoExample.webp"
    },    {
        name: "UrbanServe Group",
        title: "Moving Services",
        imgSrc: "/LogoExample.webp"
    },
    
    
];
export function Homepage() {
    return (
        <div >
            <div className="max-w-7xl m-auto p-4"><HeaderHome /></div>
            <div className="max-w-7xl m-auto p-4"><AboutUs /></div>
            <div className="max-w-7xl m-auto p-4"><PropertyActionSelection /></div>
            <div className="max-w-7xl m-auto p-4 text-center flex flex-col items-center gap-6 px-4 py-8 mt-20">
                <h1>Our Partners</h1>
                <p className="max-w-[60ch] text-gray-600">
                    Explore our diverse selection of partners and choose the one that best suits your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-10">
                    {partners.map((partner, index) => (
                        <div key={index}>
                            <div className="relative mx-auto w-36 rounded-full">
                                <img className="mx-auto h-auto w-full rounded-full object-cover " src={partner.imgSrc} alt={partner.name} />
                            </div>
                            <h3 className="my-1 text-center text-xl font-bold leading-8 ">{partner.name}</h3>
                            <p className="font-lg text-semibold text-center leading-6 ">{partner.title}</p>
                        </div>
                    ))}
                </div>
                <MainButton to="/partners" text="View all" variant="border"></MainButton>
            </div>
            <div className="max-w-7xl m-auto p-4"><PropertiesFilter /></div>
        </div>
    );
}