import React, { useState } from "react";
import { User } from 'lucide-react';
import { AppWindowMac } from 'lucide-react';
import { AlarmClockCheck } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import { Outlet, Link, useLocation } from "react-router-dom";  // Asegúrate de agregar `Outlet`

import { ROUTE_PATHS } from '../../routes/index.js';
export function UserProfile() {
    const [activeSection, setActiveSection] = useState('general');
    //se usa para obtener la ruta actual
    const location = useLocation();

    const sections = [
        { id: 'general', label: 'General Information', icon: <User />, to: ROUTE_PATHS.GENERAL_INFORMATION },
        { id: 'preferences', label: 'Preferences', icon: <AppWindowMac />, to: ROUTE_PATHS.PREFERENCES },
        { id: 'operationalHours', label: 'Operational Hours', icon: <AlarmClockCheck />, to: ROUTE_PATHS.OPERATIONAL_HOURS },
        { id: 'changePassword', label: 'Change Password', icon: <KeyRound />, to: ROUTE_PATHS.CHANGE_PASSWORD },
    ];

    const renderSection = () => {
        switch (activeSection) {
            case 'general':
                return <div>General Information Content</div>;
            case 'preferences':
                return <div>Preferences Content</div>;
            case 'operationalHours':
                return <div>Operational Hours Content</div>;
            case 'changePassword':
                return <div>Change Password</div>;
            default:
                return <div>General Information Content</div>;
        }
    };

    return (
        <div className="h-full m-auto max-w-7xl p-4">
            <div className="text-start mb-6">
                <h1>Profile</h1>
            </div>
            <div className="flex sm:flex-row flex-col gap-4">
                <div>
                    <ul className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr] gap-4 flex-grow-0">
                        {sections.map((section) => (
                            <li
                                key={section.id}
                                className={`flex cursor-pointer rounded-md gap-2 p-2 transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:scale-105 ${location.pathname.includes(section.to) ? 'bg-gray-100 ' : ''}`}
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
