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
        <div className="max-w-7xl m-auto p-4">
            <HeaderHome />
            <PropertyActionSelection />
            <AboutUs />
            <PropertiesFilter />
        </div>
    );
}
