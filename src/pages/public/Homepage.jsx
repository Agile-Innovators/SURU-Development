import { PropertiesFilter } from "../../components/homepage_components/PropertiesFilter";
import { HeaderHome } from "../../components/activity/HeaderHome.jsx";
import { PropertyActionSelection } from "../../components/activity/PropertyActionSelection.jsx";
import { AboutUs } from "../../components/activity/AboutUs.jsx";

export function Homepage() {
    return (
        <div className="max-w-7xl m-auto p-4">
            <HeaderHome />
            <PropertyActionSelection />
            <AboutUs />
            <PropertiesFilter/>
        </div>
    );
}