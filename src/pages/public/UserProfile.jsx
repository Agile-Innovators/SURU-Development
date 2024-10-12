import React, { useState } from "react";
import { User } from 'lucide-react';
import { AppWindowMac } from 'lucide-react';
import { AlarmClockCheck } from 'lucide-react';
import { KeyRound } from 'lucide-react';
export function UserProfile() {
    const [activeSection, setActiveSection] = useState('general');

    // Define the sections
    const sections = [
        { id: 'general', label: 'General Information', icon: <User /> },
        { id: 'preferences', label: 'Preferences', icon: <AppWindowMac /> },
        { id: 'operationalHours', label: 'Operational Hours', icon: <AlarmClockCheck />   },
        { id: 'changePassword', label: 'Change Password', icon:<KeyRound /> },
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
        <div className="h-screen max-w-7xl p-4">
            <div className="text-start mb-6">
                <h2>Profile</h2>
            </div>
            <div className="flex gap-4">
                <div className="w-64 h-full">
                    <ul className="flex flex-col gap-4">
                        {sections.map((section) => (
                            <li
                                key={section.id}
                                className={`flex cursor-pointer rounded-md gap-2 p-2 transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:scale-105 ${activeSection === section.id ? 'bg-gray-100 ' : ''}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                {section.icon} {section.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border w-full p-4 rounded-md">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};
