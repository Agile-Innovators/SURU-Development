import { PropertiesFilter } from '../../components/activity/homepage_components/PropertiesFilter.jsx';
import { HomeHero } from '../../components/activity/heroes/HomeHero.jsx';
import { PropertyActionSelection } from '../../components/activity/homepage_components/PropertyActionSelection.jsx';
import { AboutUs } from '../../components/activity/homepage_components/AboutUs.jsx';

export function Homepage() {
    return (
        <div className="max-w-7xl m-auto p-4">
            <HomeHero />
            <PropertyActionSelection />
            <AboutUs />
            {/* <PropertiesFilter /> */}
        </div>
    );
}
