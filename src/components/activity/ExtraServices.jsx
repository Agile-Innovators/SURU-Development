import { BasicCard } from './../../components/ui/BasicCard';

export function ExtraServices() {
    return (
        <div className="mt-20 ">
            <div className="grid grid-auto-cols-250 gap-y-4 justify-center items-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <BasicCard
                        src="/public/SellPropertyIcon.svg"
                        title="Sell a property"
                        text="10 options"
                        key={index}
                        customClass={'m-auto'}
                    ></BasicCard>
                ))}
            </div>
        </div>
    );
}

export default ExtraServices;
