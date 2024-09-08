import { BasicCard } from "../../components/ui/BasicCard";
import { ActionButton } from "../../components/ui/ActionButton";
import { RedirectButton } from "./../../components/ui/RedirectButton";
import { AdvancedCard } from "../../components/ui/AdvancedCard";

export function Homepage() {
    return (
        <div className="max-w-screen-xl m-auto px-8 sm:p-0">
            <section className="w-full grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] mt-10 gap-6">
                <div className="flex flex-col justify-center gap-4">
                    <h1 className="">Find Your Dream Property</h1>
                    <p className="">
                        Explore, buy, sell or rent properties seamlessly and
                        find exactly what you're looking for all in one place.
                    </p>
                    <RedirectButton text={"Discover Now"} customClass="w-fit" href={'#'} />
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
                        <RedirectButton
                            text="Explore Properties 🡥"
                            variant="border"
                            href={'#'}
                        />
                    </BasicCard>
                    <BasicCard
                        src="/public/SellPropertyIcon.svg"
                        title="Sell a property"
                        text="Showcase your property to the right audience today."
                        customClass="py-12"
                    >
                        <RedirectButton
                            text="Publish a Property 🡥"
                            variant="border"
                            href={'#'}
                        />
                    </BasicCard>
                    <BasicCard
                        src="/public/SellPropertyIcon.svg"
                        title="Rent a property"
                        text="Connect with potential tenants or discover your next ..."
                        customClass="py-12"
                    >
                        <RedirectButton
                            text="Find Options 🡥"
                            variant="border"
                            href={'#'}
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
            <section className="mt-20">
                <div className="text-center flex flex-col items-center gap-6 px-4 py-8">
                    <h1 >Property Gallery</h1>
                    {/* Le cambie el color y este se ve mas presentable */}
                    <p className="max-w-[60ch] text-gray-600">
                        Discover our great selection of properties and choose the one that best suits you.
                    </p>
                    <div className="w-full sm:w-[70%] flex flex-col sm:flex-row sm:justify-between items-center border border-gray-200 p-6 rounded-lg shadow-sm gap-4 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                        <div className="w-full sm:w-auto flex flex-col">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                                <option value="all">All Properties</option>
                                <option value="house">San Jose</option>
                                <option value="apartment">Heredia</option>
                                <option value="condo">Cartago</option>
                            </select>
                        </div>

                        <div className="w-full sm:w-auto flex flex-col">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                            <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                                <option value="all">All Prices</option>
                                <option value="100000">₡100,000-₡150,000</option>
                                <option value="150000">₡150,000-₡200,000</option>
                                <option value="200000">₡200,000-₡250,000</option>
                            </select>
                        </div>

                        <div className="w-full sm:w-auto flex flex-col">
                            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                            <select className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
                                <option value="all">All Types</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="condo">Condo</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-auto mt-4 sm:mt-0">
                            <RedirectButton variant="border" text="Clear" customClass="p-3 " />
                        </div>
                        <div className="w-full sm:w-auto mt-4 sm:mt-0">
                            <RedirectButton  text="Search" customClass="p-3 " />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4 justify-center items-center mt-10">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <AdvancedCard
                            srcImage="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
                            title="Casa en la Montaña"
                            location="San José"
                            price={100000}
                            frequency="monthly"
                            key={index}
                            customClass={'m-auto'}
                        >
                            <RedirectButton
                                text="View"
                                variant="border"
                                href={'#'}
                            />
                        </AdvancedCard>
                    ))}
                </div>
            </section>
            




        </div>
    );
}
