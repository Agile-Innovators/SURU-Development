import { OperationalHourSelector } from '../../components/ui/selector/OperationalHourSelector';
import { MainButton } from '../../components/ui/buttons/MainButton';

export function OperationalHours() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
        <div className='p-4'>
            <div className='flex flex-col gap-2'>
                <h2>Operational Hours</h2>
                <p>Choose your prefere hours to receive appointments</p>
            </div>
            <form className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
                {daysOfWeek.map((day) => (
                    <OperationalHourSelector
                        key={day}
                        day={day}
                    />
                ))}
            </form>
        </div>
    );
}