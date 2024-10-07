import { ToggleSwitch } from '../buttons/ToggleSwitch';

export function OperationalHourSelector({ day, bgColor, textColor }) {
    return (
        <div
            className={`grid gap-4 px-3 py-2 items-center border text-center border-gray-300 rounded-md sm:flex ${bgColor}`}
        >
            <p className={textColor}>{day}</p>
            <span className={textColor}>|</span>
            <input
                type="time"
                id={`${day}-min-hour`}
                name={`${day}-min-hour`}
                min="06:00"
                max="20:00"
                className={`p-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
            />
            <span className={textColor}>----</span>
            <input
                type="time"
                id={`${day}-max-hour`}
                name={`${day}-min-hour`}
                min="06:00"
                max="20:00"
                className="p-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            <span className={textColor}>|</span>
            <ToggleSwitch />
        </div>
    );
}
