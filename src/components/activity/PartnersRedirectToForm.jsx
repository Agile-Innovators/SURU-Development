import { MainButton } from "./../../components/ui/MainButton";

export function PartnersRedirectToForm(){
    return(
        <div className="py-20">
        {/* <div className=" flex mx-auto max-w-7xl px-6 lg:px-8"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mx-auto max-w-7xl px-6 lg:px-8">
          <img className="w-full mx-auto order-1 " src="/public/PartnersInfo.jpg" alt="" />
          <div className="mx-auto max-w-2xl lg:text-left md: order-1">
            <h3 className="text-base font-semibold leading-7 text-indigo-600">Do you have a service company?</h3>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Empower Your Business with Our Platform</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Connect with property owners and renters looking for the services you provide. Expand your reach and enjoy exclusive opportunities.</p>
            {/* cambiar el type del mainbutton a link */}
            <MainButton to="/partners"t type="button" text="Join Us" variant="border" customClass="border-primary mt-6 text-primary hover:bg-primary hover:text-white px-4"></MainButton>
          </div>
        </div>
      </div>
    );
}