
import { Clock } from 'lucide-react';

export function SessionExpiredModal() {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded shadow-lg text-center m-auto max-w-[25rem]">
            <div className="m-auto p-3 bg-translucid-blue dark:bg-[#045B80]  rounded-full inline-block">
                <Clock size={42} className="text-secondary stroke-2" />
            </div>
            <h2 className="text-xl font-semibold my-4">Session has expired</h2>
            <p>Your session has ended. We&apos;ll take you to the login page to keep browsing...</p>
        </div>
    );
}