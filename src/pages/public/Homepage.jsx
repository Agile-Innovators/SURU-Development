import { PropertiesFilter } from "../../components/activity/homepage_components/PropertiesFilter.jsx";
import { HomeHero } from "../../components/activity/heroes/HomeHero.jsx";
import { PropertyActionSelection } from "../../components/activity/homepage_components/PropertyActionSelection.jsx";
import { AboutUs } from "../../components/activity/homepage_components/AboutUs.jsx";

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
            <HomeHero />
            <PropertyActionSelection />
            <AboutUs />
            <PropertiesFilter />
        </div>
    );
}
