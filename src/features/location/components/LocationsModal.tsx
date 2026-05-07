import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Home, Briefcase, Dumbbell, MapPin } from 'lucide-react';

import LocationCard from "./LocationCard";

import type { UserLocation } from "./LocationCard";



const MOCK_LOCATIONS: UserLocation[] = [
    {
        locationId: 'loc_001',
        userId: 'usr_ignacio',
        label: 'Casa',
        type: 'home',
        lat: -17.3895,
        lng: -66.1568,
        isDefault: false,
    },
    {
        locationId: 'loc_003',
        userId: 'usr_ignacio',
        label: 'Gimnasio',
        type: 'gym',
        lat: -17.4012,
        lng: -66.1644,
        isDefault: true,
    },
];

export default function LocationsModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [locations, setLocations] = useState<UserLocation[]>(MOCK_LOCATIONS);

    const handleDelete = (id: string) => {
        setLocations((prev) => prev.filter((l) => l.locationId !== id));
    };

    if (!isOpen) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FFFBF4] dark:bg-[#0A0B0D]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full border-2 border-[#88B04B] px-8 py-3 font-outfit text-xs font-black uppercase tracking-widest text-[#88B04B] transition-all hover:bg-[#88B04B] hover:text-white"
                >
                    Gestionar Ubicaciones
                </button>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0B0D]/60 px-4 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-[#88B04B]/20 bg-[#FFFBF4] dark:bg-[#0A0B0D] shadow-2xl transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#88B04B]/10 px-7 py-5">
                    <h2 className="font-outfit text-lg font-black tracking-tight text-[#1E1E1E] dark:text-[#F5F3EF]">
                        Mis Ubicaciones
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="
                            flex h-9 w-9 items-center justify-center rounded-full
                            bg-[#1A1B1E]/5 dark:bg-white/5 text-[#1E1E1E] dark:text-[#F5F3EF]
                            hover:bg-[#88B04B] hover:text-white transition-all duration-200
                        "
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex max-h-[22rem] flex-col gap-3 overflow-y-auto p-5 custom-scrollbar">
                    {locations.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-12 text-[#1E1E1E]/40 dark:text-[#F5F3EF]/30">
                            <MapPin size={32} className="text-[#88B04B]/40" />
                            <p className="font-outfit text-sm font-bold">No hay destinos guardados</p>
                        </div>
                    ) : (
                        locations.map((loc) => (
                            <LocationCard
                                key={loc.locationId}
                                location={loc}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>

                <div className="px-6 pb-7 pt-2">
                    <button
                        onClick={() => alert('Añadir nueva ubicación')}
                        className="
                            flex w-full items-center justify-center gap-2 rounded-full
                            border-2 border-dashed border-[#88B04B]/40 py-3
                            font-outfit text-[11px] font-black uppercase tracking-[0.15em] text-[#88B04B]
                            transition-all hover:border-[#88B04B] hover:bg-[#88B04B]/5 active:scale-95
                        "
                    >
                        <Plus size={16} strokeWidth={3} />
                        Agregar nueva ubicación
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background: rgba(136, 176, 75, 0.2); 
                    border-radius: 10px; 
                }
            `}} />
        </div>
    );
}
