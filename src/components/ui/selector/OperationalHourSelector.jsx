import { ToggleSwitch } from '../buttons/ToggleSwitch';

export function OperationalHourSelector({ day, bgColor, textColor }) {
    return (
        <div className={`flex flex-col gap-4 px-3 py-2 border text-left border-gray-300 dark:border-gray-600 rounded-md sm:flex w-full ${bgColor} dark:bg-gray-800`}>
            <div className="flex justify-between items-center gap-4">
                <p className={`${textColor} dark:text-white`}>Date and time</p>
                <ToggleSwitch />
            </div>
            <div className="flex items-start flex-col w-full gap-2">
                <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                    <span className="text-gray-600 dark:text-gray-400">Day</span>
                    <span className="text-black dark:text-white">{day}</span>
                </div>
                <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                    <span className="text-gray-600 dark:text-gray-400 ">From</span>
                    <input 
                        type="time"
                        id={`${day}-min-hour`}
                        name={`${day}-min-hour`}
                        min="06:00"
                        max="20:00"
                        className=" time-input p-1 border w-full text-black  dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-100"
                    />
                </div>
                <div className="grid grid-cols-[60px,1fr] gap-2 items-center w-full">
                    <span className="text-gray-600 dark:text-gray-400">To</span>
                    <input
                        type="time"
                        id={`${day}-max-hour`}
                        name={`${day}-min-hour`}
                        min="06:00"
                        max="20:00"
                        className="time-input w-full p-1 border text-black bg-transparent dark:text-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-100"
                    />
                </div>
            </div>
        </div>
    );
}
