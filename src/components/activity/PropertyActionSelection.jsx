import { ROUTE_PATHS } from "../../routes/index.js";
import { BasicCard } from "../ui/BasicCard.jsx";
import { MainButton } from "../ui/MainButton.jsx";

export function PropertyActionSelection() {
  return (
    <section className="mt-20 flex flex-col">
      <div className="text-center grid gap-2">
        <h2>Managing Properties Has Never Been This Simple</h2>
        <p>Access a platform that takes the complexity out of managing realestate</p>
      </div>
      <div className="grid grid-cols-auto-300 justify-center mt-5 gap-8 ">
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
    </section>
  );
}

export default PropertyActionSelection;
