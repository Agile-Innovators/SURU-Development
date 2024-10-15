import { ToggleSwitch } from '../buttons/ToggleSwitch';

export function OperationalHourSelector({ day, bgColor, textColor }) {
    return (
        <div className={`flex flex-col gap-4 px-3 py-2 border text-left border-gray-300 rounded-md sm:flex ${bgColor} w-full`}>
            <div className="flex justify-between items-center gap-4">
                <p className={textColor}>Date and time</p>
                <ToggleSwitch />
            </div>
            <div className="flex items-start flex-col w-full gap-2">
                <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                    <span className="text-gray-600">Day</span>
                    <span>{day}</span>
                </div>
                <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                    <span className="text-gray-600">From</span>
                    <input
                        type="time"
                        id={`${day}-min-hour`}
                        name={`${day}-min-hour`}
                        min="06:00"
                        max="20:00"
                        className="p-1 border w-full text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                </div>
                <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                    <span className="text-gray-600">To</span>
                    <input
                        type="time"
                        id={`${day}-max-hour`}
                        name={`${day}-min-hour`}
                        min="06:00"
                        max="20:00"
                        className="w-full p-1 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                </div>
            </div>
        </div>
    );
}
