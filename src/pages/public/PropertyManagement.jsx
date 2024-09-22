import { BackButton } from "../../components/ui/BackButton.jsx";
import { MapPin } from 'lucide-react';
import { ActionButton } from "../../components/ui/ActionButton.jsx";
import { MainButton } from "../../components/ui/MainButton.jsx";
import { ROUTE_PATHS } from "../../routes/index.js";
export function PropertyManagement() {
    return (
        <div className="max-w-7xl m-auto p-4 ">
            <BackButton />
            <div className="text-center grid gap-4">
                <h1>Manage Publications</h1>
                <div className="flex w-full justify-center sm:justify-end mt-4"><MainButton type="link" to={ROUTE_PATHS.CREATE_PROPERTY} text="Add New Property" customClass="w-full sm:w-auto" /></div>
                <div className="flex flex-col sm:flex-row border rounded-md p-4 text-left justify-center sm:justify-between items-center">
                    <div className="text-center sm:text-left">
                        <h3>Cabaña en Santa Teresa</h3>
                        <div className='flex gap-3 justify-center sm:justify-start'>
                            <MapPin size={22} strokeWidth={1} className='text-grey' />
                            <p>Santa Teresa, Costa Rica</p>
                        </div>
                    </div>
                    <h3 className='text-2xl font-medium'>₡123.123 <span className='text-grey'>Monthly</span></h3>
                    <div className="flex flex-col sm:flex-row justify-center p-2 gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                        <MainButton text="Edit" customClass="w-full sm:w-auto" variant="border" />
                        <MainButton text="Remove" customClass="bg-red-500 hover:bg-red-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}