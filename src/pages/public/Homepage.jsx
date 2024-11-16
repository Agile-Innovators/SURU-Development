import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PropertiesFilter } from '../../components/activity/homepage_components/PropertiesFilter.jsx';
import { HomeHero } from '../../components/activity/heroes/HomeHero.jsx';
import { PropertyActionSelection } from '../../components/activity/homepage_components/PropertyActionSelection.jsx';
import { AboutUs } from '../../components/activity/homepage_components/AboutUs.jsx';

export function Homepage() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#about-us') {
            const section = document.getElementById('about-us');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div className="max-w-7xl m-auto p-4">
            <HomeHero />
            <PropertyActionSelection />
            <div id="about-us">
                <AboutUs />
            </div>
            <PropertiesFilter />
        </div>
    );
}
