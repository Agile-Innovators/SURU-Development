import { BasicCard } from "../../components/ui/BasicCard";
import { MainButton } from "./../../components/ui/MainButton";
import { PropertiesFilter } from "../../components/homepage_components/PropertiesFilter";
import { ROUTE_PATHS } from "../../routes/index.js";


export function Homepage() {
    return (
        <div className="max-w-screen-xl m-auto px-8 sm:p-0">
            <section className="w-full grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] mt-10 gap-6">
                <div className="flex flex-col justify-center gap-4">
                    <h1 className="">Find Your Dream Property</h1>
                    <p className="">
                        Explore, buy, sell or rent properties seamlessly and
                        find exactly what you&apos;re looking for all in one place.
                    </p>
                    <MainButton type="button" text={"Discover Now"} customClass="w-fit" href={'#'} />
                </div>
                <div className="flex items-center">
                    <img
                        className="aspect-square"
                        src="/public/images/Group 104.png"
                        alt="Landing Page Image"
                    />
                </div>
            </section>
            {/* ----------------------------------------- */}
            <section className="mt-20 flex flex-col px-8 sm:p-0">
                <div className="text-center grid gap-2">
                    <h2>Managing Properties Has Never Been This Simple</h2>
                    <p>
                        Access a platform that takes the complexity out of
                        managing real estate
                    </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] justify-center mt-5 gap-8 ">
                    <BasicCard
                        src="/public/SellPropertyIcon.svg"
                        title="Buy a property"
                        text="Explore properties that match your lifestyle perfectly."
                        customClass="py-12"
                    >
                        <MainButton
                            text="Explore Properties 🡥"
                            variant="border"
                            type="link"
                            to={ROUTE_PATHS.NOT_FOUND}
                        />
                    </BasicCard>
                    <BasicCard
                        src="/public/SellPropertyIcon.svg"
                        title="Sell a property"
                        text="Showcase your property to the right audience today."
                        customClass="py-12"
                    >
                        <MainButton
                            text="Publish a Property 🡥"
                            variant="border"
                            type="link"
                            to={ROUTE_PATHS.NOT_FOUND}
                        />
                    </BasicCard>
                    <BasicCard
                        src="/public/SellPropertyIcon.svg"
                        title="Rent a property"
                        text="Connect with potential tenants or discover your next ..."
                        customClass="py-12"
                    >
                        <MainButton
                            text="Find Options 🡥"
                            variant="border"
                            type="link"
                            to={ROUTE_PATHS.NOT_FOUND}
                        />
                    </BasicCard>
                </div>
                {/* -------------------------------------------------------------- */}
            </section>
            <section className="mt-20 grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4">
                <div>
                    <img src="/public/about-us-img.svg" alt="" />
                </div>
                <div className="flex flex-col justify-center gap-4">
                    <h2>About us</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Nibh eu mi
                        libero turpis ultrices. Eros nulla etiam id at sem
                        aliquam parturient ut. Hendrerit commodo tristique
                        gravida porta velit id. Orci proin a tellus natoque.
                    </p>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4">
                        <div>
                            <span className="font-semibold">+120</span>
                            <p>Active users</p>
                        </div>
                        <div>
                            <span className="font-semibold">+50</span>
                            <p>Availables properties</p>
                        </div>
                        <div>
                            <span className="font-semibold">+15</span>
                            <p>Partner Companies</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-20">
                <div className="text-center flex flex-col items-center gap-4">
                    <h2>Extra Services</h2>

                    <p className="max-w-[60ch]">
                        Enjoy special offers on our partner services to make
                        your move and property management easier
                    </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-y-4 justify-center items-center mt-10">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <BasicCard
                            src="/public/SellPropertyIcon.svg"
                            title="Sell a property"
                            text="10 options"
                            key={index}
                            customClass={'m-auto'}
                        >
                        </BasicCard>
                    ))}
                </div>
            </section>
            <PropertiesFilter/>
        </div>
    );
}