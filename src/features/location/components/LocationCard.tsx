
import { X, Plus, Trash2, Home, Briefcase, Dumbbell, MapPin } from 'lucide-react';
export type LocationType = 'home' | 'work' | 'gym' | 'other';

export interface UserLocation {
    locationId: string;
    userId: string;
    label: string;
    type: LocationType;
    lat: number;
    lng: number;
    isDefault: boolean;
}
const TYPE_ICONS: Record<LocationType, React.ReactNode> = {
    home: <Home size={16} />,
    work: <Briefcase size={16} />,
    gym: <Dumbbell size={16} />,
    other: <MapPin size={16} />,
};

export default function LocationCard({
    location,
    onDelete,
}: {
    location: UserLocation;
    onDelete: (id: string) => void;
}) {
    const { locationId, label, type, lat, lng, isDefault } = location;

    return (
        <div
            className={`
                flex items-center gap-3 rounded-[1.25rem] border px-4 py-3 transition-all duration-300
                ${isDefault
                    ? 'border-[#88B04B]/50 bg-[#88B04B]/5 dark:bg-[#88B04B]/10'
                    : 'border-[#88B04B]/15 bg-white dark:bg-[#141518] dark:border-white/10 hover:border-[#88B04B]/40'}
            `}
        >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#88B04B]/10 text-[#88B04B]">
                {TYPE_ICONS[type]}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-outfit text-sm font-extrabold leading-none text-[#1E1E1E] dark:text-[#F5F3EF]">
                        {label}
                    </span>
                    {isDefault && (
                        <span className="rounded-full bg-[#88B04B] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                            Predeterminada
                        </span>
                    )}
                </div>

                <p className="mt-1 font-inter text-[10px] font-bold uppercase tracking-widest text-[#88B04B]">
                    {type}
                </p>

                <p className="mt-0.5 font-mono text-[11px] tabular-nums text-[#1E1E1E]/60 dark:text-[#F5F3EF]/50">
                    {lat.toFixed(4)}, {lng.toFixed(4)}
                </p>
            </div>

            <button
                onClick={() => onDelete(locationId)}
                className="
                    flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full
                    border border-red-200/50 text-red-500 opacity-60 transition-all
                    hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:opacity-100
                "
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
}
