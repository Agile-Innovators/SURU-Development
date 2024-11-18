import { ROUTE_PATHS } from '../../../routes/index.js';
import { BasicCard } from '../../ui/cards/BasicCard.jsx';
import { MainButton } from '../../ui/buttons/MainButton.jsx';

export function PropertyActionSelection() {
    return (
        <section className="mt-10 md:mt-20 flex flex-col">
            <div className="text-center grid gap-2">
                <h2>Managing Properties Has Never Been This Simple</h2>
                <p>
                    Access a platform that takes the complexity out of managing
                    real estate
                </p>
            </div>
            <div className="grid grid-cols-auto-300 justify-center mt-5 gap-8 ">
                <BasicCard
                    src="/SellPropertyIcon.svg"
                    title="Buy a property"
                    text="Explore properties that match your lifestyle perfectly."
                    customClass="py-12"
                >
                    <MainButton
                        text="Explore Properties 🡥"
                        variant="border"
                        type="link"
                        to={ROUTE_PATHS.SEARCH}
                    />
                </BasicCard>
                <BasicCard
                    src="/SellPropertyIcon.svg"
                    title="Sell a property"
                    text="Showcase your property to the right audience today."
                    customClass="py-12"
                >
                    <MainButton
                        text="Publish a Property 🡥"
                        variant="border"
                        type="link"
                        to={ROUTE_PATHS.CREATE_PROPERTY}
                    />
                </BasicCard>
                <BasicCard
                    src="/SellPropertyIcon.svg"
                    title="Rent a property"
                    text="Connect with potential tenants or discover your next rental home."
                    customClass="py-12"
                >
                    <MainButton
                        text="Find Options 🡥"
                        variant="border"
                        type="link"
                        to={ROUTE_PATHS.SEARCH}
                    />
                </BasicCard>
            </div>
        </section>
    );
}

export default PropertyActionSelection;
