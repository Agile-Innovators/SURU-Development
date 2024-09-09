import { BasicCard } from "../ui/BasicCard.jsx";
import {
    Fence,
    Cctv,
    Truck,
    MapPinHouse,
    Rat,
    Paintbrush
} from "lucide-react";

export function AvailableServices() {
    return (
        <>
        <section className="text-center">
            <h3 className="mt-36 text-secondary">Additional services available</h3>
            <p className="m-0 text-primary mt-4 mx-auto md:max-w-[700px] 2xl:max-w-[1032px]">
              This section is designed to facilitate services that may be
              required during the moving process. You will find companies
              related to cleaning, pest control, transportation, gardening, and
              many more. Dare to try this platform and save time!{" "}
            </p>
        </section>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-8 mt-28 mx-auto items-center justify-items-center">
          <BasicCard
            icon={<Fence className="w-24 h-24 text-primary stroke-1" />}
            title="Gardening"
            variant="border"
            text="10 services available"
            customClass="cursor-pointer"
          />
          <BasicCard
            icon={<Cctv className="w-24 h-24 text-primary stroke-1" />}
            title="Security"
            variant="border"
            text="10 services available"
            customClass="cursor-pointer"
          />
          <BasicCard
            icon={<Truck className="w-24 h-24 text-primary stroke-1" />}
            title="Moving"
            variant="border"
            text="10 services available"
            customClass="cursor-pointer"
          />
          <BasicCard
            icon={<MapPinHouse className="w-24 h-24 text-primary stroke-1" />}
            title="Transportation"
            variant="border"
            text="10 services available"
            customClass="cursor-pointer"
          />
          <BasicCard
            icon={<Rat className="w-24 h-24 text-primary stroke-1" />}
            title="Pest Control"
            variant="border"
            text="10 services available"
            customClass="cursor-pointer"
          />
          <BasicCard
            icon={<Paintbrush className="w-24 h-24 text-primary stroke-1" />}
            title="Cleaning"
            variant="border"
            text="10 services available"
            customClass="cursor-pointer"
          />
        </div>
        </>
    );
}

export default AvailableServices;