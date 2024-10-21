import { BedDouble, Bath, Trees, PawPrint, LandPlot } from 'lucide-react';

// SVG personalizado para "floors"
const FloorsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-white"
    >
        <rect width="10" height="4" x="2" y="16" />
        <rect width="10" height="4" x="4" y="12" />
        <rect width="10" height="4" x="6" y="8" />
        <rect width="10" height="4" x="8" y="4" />
        <path d="M12 20h10V4h-4" />
    </svg>
);

// SVG personalizado para "pools"
const PoolIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-white"
    >
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
);

// Array de features
const featuresData = [
    { icon: BedDouble, label: 'bedrooms', valueKey: 'bedrooms' },
    { icon: Bath, label: 'bathrooms', valueKey: 'bathrooms' },
    { icon: FloorsIcon, label: 'floors', valueKey: 'floors' }, // SVG personalizado
    { icon: PoolIcon, label: 'pools', valueKey: 'pools' },     // SVG personalizado
    { icon: Trees, label: 'backyards', valueKey: 'backyards'  },
    { icon: LandPlot, label: 'm²', valueKey: 'size_in_m2' }
];

export function PropertyFeatures({ property }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
            {featuresData.map(({ icon: Icon, label, valueKey, value, defaultValue }) => (
                <div key={label} className="w-full h-full flex flex-col justify-between">
                    {typeof Icon === 'string' ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="dark:stroke-white"
                        >
                            {/* SVG Content */}
                        </svg>
                    ) : (                        
                        <Icon size={40} strokeWidth={1.5} className="dark:stroke-white"/>
                    )}
                    <div className="flex items-baseline space-x-1">
                        <b className="font-bold">
                            {value || property[valueKey] || defaultValue || 'N/A'}
                        </b>
                        <p>{label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
