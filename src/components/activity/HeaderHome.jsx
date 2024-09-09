import { MainButton } from "../ui/MainButton";

export function HeaderHome() {
  return (
    <div className="w-full text-center flex flex-col md:flex-row md:text-start mt-10 gap-6">
      <section className="flex flex-col justify-center gap-4 w-full">
        <h1>Find Your Dream Property</h1>
        <p>Explore, buy, sell or rent properties seamlessly and find exactly what you&apos;re looking for all in one place.</p>
        <MainButton
          type="button"
          text={"Discover Now"}
          customClass="w-fit m-auto md:m-0"
          href={"#"}
        />
      </section>
      <div className="flex items-center w-full">
        <img
          className="aspect-square w-[30rem] mx-auto md:w-full"
          src="/public/images/Group 104.png"
          alt="Landing Page Image"
        />
      </div>
    </div>
  );
}
