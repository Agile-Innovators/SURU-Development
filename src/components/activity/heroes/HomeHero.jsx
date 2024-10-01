import { MainButton } from "../../ui/buttons/MainButton";
import { ROUTE_PATHS } from "../../../routes/index.js";

export function HomeHero() {
  return (
    <div className="w-full text-center flex flex-col md:flex-row md:text-start mt-10 gap-6">
      <section className="flex flex-col justify-center gap-4 w-full">
        <h1>Find Your Dream Property</h1>
        <p>Explore, buy, sell or rent properties seamlessly and find exactly what you&apos;re looking for all in one place.</p>
        <MainButton
          type="link"
          text={"Discover Now"}
          customClass="w-fit m-auto md:m-0"
          to={ROUTE_PATHS.SEARCH}
        />
      </section>
      <div className="flex items-center w-full">
        <img
          className="aspect-square w-[30rem] mx-auto md:w-full"
          src="/images/Group 104.png"
          alt="Landing Page Image"
        />
      </div>
    </div>
  );
}
