import { BasicCard } from "../common/BasicCard";

export function ExtraServices() {
  return (
    <div className="mt-20">
      <section className="text-center flex flex-col items-center gap-4">
        <h2>Extra Services</h2>
        <p className="max-w-[60ch]">
          Enjoy special offers on our partner services to make your move and
          property management easier
        </p>
      </section>
      
      <div className="grid grid-auto-cols-250 gap-y-4 justify-center items-center mt-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <BasicCard
            src="/public/SellPropertyIcon.svg"
            title="Sell a property"
            text="10 options"
            key={index}
            customClass={"m-auto"}
          ></BasicCard>
        ))}
      </div>
    </div>
  );
}

export default ExtraServices;