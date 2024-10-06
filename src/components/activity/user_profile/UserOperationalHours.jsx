import { MainButton } from '../../ui/buttons/MainButton';
import { OperationalHourSelector } from '../../ui/selector/OperationalHourSelector';

export function UserOperationalHours() {
    return (
        <div className="bg-white p-6">
            <h2 className="text-lg">Operational Hours</h2>
            <p>Choose your prefere hours to receive appointments</p>
            <form className="grid gap-4 mt-4">
                <div className="grid grid-cols-auto-250 gap-4 sm:grid-cols-1">
                    <OperationalHourSelector day={'Monday'} />
                    <OperationalHourSelector
                        day={'Tuesday'}
                        bgColor={'bg-gray-500 text-white'}
                        textColor={'text-white'}
                    />
                    <OperationalHourSelector day={'Wednesday'} />
                    <OperationalHourSelector
                        day={'Thursday'}
                        bgColor={'bg-gray-500 text-white'}
                        textColor={'text-white'}
                    />
                    <OperationalHourSelector day={'Friday'} />
                    <OperationalHourSelector
                        day={'Saturday'}
                        bgColor={'bg-gray-500 text-white'}
                        textColor={'text-white'}
                    />
                    <OperationalHourSelector day={'Sunday'} />
                </div>
                <div className="flex flex-col gap-4 mt-5 sm:flex-row">
                    <MainButton
                        type="button"
                        variant="fill"
                        text="Save changes"
                        customClass="h-12 items-center"
                    />
                    <MainButton
                        type="button"
                        variant="border"
                        text="Cancel"
                        customClass="h-12 items-center"
                    />
                </div>
            </form>
        </div>
    );
}
