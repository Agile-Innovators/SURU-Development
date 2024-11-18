import { AlarmClockCheck, KeyRound, AppWindowMac, User } from 'lucide-react'
import { Outlet, Link, useLocation } from "react-router-dom";  
import { ROUTE_PATHS } from '../../routes/index.js';
import { useAuth } from '../../global/AuthProvider.jsx';
import { Logs } from 'lucide-react';


export function UserProfile() {
    //se usa para obtener la ruta actual
    const location = useLocation();
    //se obtiene el contexto de autenticación
    const { getUser } = useAuth();
    //se obtiene el usuario actual
    const { user } = getUser();
    //se obtiene el rol del usuario
    const sectionsUser = [
        // General Information section for both user types
        {
            id: 'general',
            label: 'General Information',
            icon: <User />,
            to: ROUTE_PATHS.GENERAL_INFORMATION,
        },
        // Services section only for partners
        ...(user.user_type === 'partner' ? [{
            id: 'services',
            label: 'Services',
            icon: <Logs />,
            to: ROUTE_PATHS.PARTNER_SERVICES,
        }] : []),
        // Common sections for all users
        {
            id: 'preferences',
            label: 'Preferences',
            icon: <AppWindowMac />,
            to: ROUTE_PATHS.PREFERENCES,
        },
        {
            id: 'operationalHours',
            label: 'Operational Hours',
            icon: <AlarmClockCheck />,
            to: ROUTE_PATHS.OPERATIONAL_HOURS,
        },
        {
            id: 'changePassword',
            label: 'Change Password',
            icon: <KeyRound />,
            to: ROUTE_PATHS.CHANGE_PASSWORD,
        },
    ];
    
    return (
        <div className="h-full w-full m-auto max-w-7xl p-4 min-h-[80vh]">
            <div className="text-start mb-6">
                <h1>Profile</h1>
            </div>
            <div className="flex sm:flex-row flex-col gap-4">
                <div>
                    <ul className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr] gap-4 flex-grow-0">
                        {sectionsUser.map((section) => (
                            <li
                                key={section.id}
                                className={`flex cursor-pointer rounded-md gap-2 p-2 transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:brightness-[.85] dark:hover:brightness-150 ${location.pathname.includes(section.to)
                                        ? 'bg-[#d5d9e2] dark:bg-[#4d607c] text-black dark:text-gray-300'  
                                        : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-300'  
                                    }`}
                            >
                                <Link to={section.to} className="flex items-center gap-2">
                                    {section.icon} {section.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border rounded-md flex-grow transition-all duration-300 hover:shadow-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
