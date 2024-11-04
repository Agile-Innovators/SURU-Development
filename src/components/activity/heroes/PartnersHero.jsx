import { MainButton } from '../../ui/buttons/MainButton';
import { ROUTE_PATHS } from '../../../routes';

export function PartnersHero() {
    return (
        <header
            className="relative h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: 'url(/PartnersHeroImage.jpg)' }}
        >
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="flex flex-col justify-center items-center text-center px-6 py-12 max-w-3xl ">
                    <h1 className="text-5xl font-bold mb-4 text-white dark:text-white">
                        Know Our Partners
                    </h1>
                    <p className="text-xl mb-8 text-white">
                        Our trusted partners offer top-tier services, making
                        buying, selling, and renting easier for our community.
                    </p>
                    <MainButton
                        to={ROUTE_PATHS.SEARCH_PARTNERS}
                        type="link"
                        text="View all"
                        variant="border"
                        customClass="border-white dark:border-white dark:text-white text-white hover:bg-white/[.35] hover:border-white/[.35] p-4"
                    />
                </div>
            </div>
        </header>
    );
}
