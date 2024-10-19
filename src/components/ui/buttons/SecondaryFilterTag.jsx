import { useState, useEffect } from 'react';

export function SecondaryFilterTag({
    text,
    idValue,
    groupType = 'individual',
    isActivate,
    handleSelectedValue,
    manageExternalState,
    fillData,
    id,
    ...props
}) {
    const [isChecked, setIsChecked] = useState(isActivate);
    const valueID = idValue;

    useEffect(() => {
        setIsChecked(isActivate);
    }, [isActivate]);

    const handleEventButton = (e) => {
        if (groupType === 'group') {
            setIsChecked(true);
            handleSelectedValue(valueID);
        } else {
            setIsChecked((prevChecked) => {
                const newChecked = !prevChecked;

                if (newChecked) {
                    if (handleSelectedValue) {
                        handleSelectedValue(valueID);
                    }
                    if (fillData) {
                        fillData(1);
                    }
                } else {
                    if (handleSelectedValue) {
                        handleSelectedValue(valueID, 'remove');
                    }
                    if (fillData) {
                        fillData('0');
                    }
                }
                if (manageExternalState) {
                    manageExternalState(newChecked);
                }

                return newChecked;
            });
        }
    };

    return (
        <button
            type="button"
            id={id}
            onClick={(e) => handleEventButton(e)}
            className={`flex justify-between gap-2 transition-colors duration-150 group border-2 rounded-md p-2 
                ${isChecked 
                    ? 'border-light-blue text-light-blue' 
                    : 'border-white text-white dark:border-gray-600 dark:text-gray-300'}
                hover:border-light-blue dark:hover:border-light-blue`}
            {...props}
        >
            <span className="flex">
                <span
                    className={`transition-colors duration-150 
                        ${isChecked 
                            ? 'text-light-blue' 
                            : 'text-white dark:text-gray-300'} 
                        group-hover:text-light-blue`}
                >
                    {text}
                </span>
            </span>

            <span className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                    <input
                        checked={isChecked}
                        type="checkbox"
                        onChange={handleEventButton}
                        className={`peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 dark:bg-gray-800 shadow hover:shadow-md border border-slate-300 checked:bg-light-blue checked:border-light-blue`}
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
                </label>
            </span>
        </button>
    );
}
