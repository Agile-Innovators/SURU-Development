import { MainButton } from "../../ui/buttons/MainButton";
import { Moon, Sun } from "lucide-react";

export function UserPreference() {
    return (
        <div className="bg-white p-6">
            <h2 className="text-xl">Preferences</h2>
            <p>Change your preference settings</p>
            <div className="mt-8">
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <label htmlFor="language-select">Theme</label>
                        <div className="flex gap-4">
                            <div className="p-2 border border-gray-300 rounded-md relative">
                                <input
                                    onClick={() => console.log("DarkMode")}
                                    type="checkbox"
                                    className="absolute w-10 h-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 cursor-pointer"
                                />
                                <Moon />
                            </div>
                            <div className="p-2 border border-gray-300 rounded-md relative cursor-pointer">
                                <input
                                    onClick={() => console.log("LightMode")}
                                    type="checkbox"
                                    className="absolute w-10 h-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 cursor-pointer"
                                />
                                <Sun />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="language-select">Language</label>
                        <select
                            name="language"
                            id="language-select"
                            className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        >
                            <option value="Español">Español</option>
                            <option value="Inglés">Inglés</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="language-select">Notifications</label>
                        <select
                            name="language"
                            id="language-select"
                            className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        >
                            <option value="On">On</option>
                            <option value="Off">Off</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <p className="text-black">Delete account</p>
                        <MainButton
                            type="button"
                            variant="fill"
                            text="Delete"
                            customClass="h-12 items-center bg-red-500 sm:w-fit"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-4 sm:flex-row">
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
            </div>
        </div>
    );
}
