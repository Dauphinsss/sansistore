// components/MapPicker.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Polygon } from "react-leaflet";
import { useLocation } from "../hooks/useLocation";
import { useZoneValidation } from "../hooks/useZoneValidation";
import { saveLocation } from "../services/locationService";
import type { LocationType } from "../types";
import "leaflet/dist/leaflet.css";
import { useAuthUser } from "../../../hooks/useAuthUser";



type MapEventsProps = {
    setLat: React.Dispatch<React.SetStateAction<number>>;
    setLng: React.Dispatch<React.SetStateAction<number>>;
    onLocationChange: (lat: number, lng: number) => void;
};

function MapEvents({ setLat, setLng, onLocationChange }: MapEventsProps) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onLocationChange(lat, lng);
            setLat(lat);
            setLng(lng);
        },
    });

    return null;
}

export default function MapPicker() {
    const {
        lat,
        lng,
        label,
        type,
        setLat,
        setLng,
        setLabel,
        setType,
    } = useLocation();

    const {
        errorMessage,
        showError,
        validateLocation,
        validateBeforeSave,
        getSuccessMessage,
        allowedZones,
    } = useZoneValidation();

    const mapCenter: [number, number] = allowedZones.length > 0 && allowedZones[0].points.length > 0
        ? allowedZones[0].points[0]
        : [lat, lng];

    const handleLocationChange = (newLat: number, newLng: number) => {
        validateLocation(newLat, newLng);
    };

    const { user } = useAuthUser();

    const handleSave = async () => {
        if (!validateBeforeSave(lat, lng)) {
            return;
        }

        const payload = {
            userId: user?.uid ?? "",
            lat,
            lng,
            label,
            type,
            isDefault: false,
        };

        try {
            await saveLocation(payload);
            alert(getSuccessMessage(lat, lng));
        } catch (err) {
            console.error("ERROR:", err);
            alert("Error al guardar la ubicación");
        }
    };


    return (
        <div className="bg-(--theme-card-bg) text-(--theme-text) p-4 rounded-2xl border border-(--theme-border) flex flex-col gap-3.5">
 
            <h1 className="font-extrabold text-lg">
                Seleccionar ubicacion
            </h1>
 
            {showError && errorMessage && (
                <div className="bg-red-500 text-white px-3 py-3 rounded-xl mb-2.5 text-sm whitespace-pre-line animate-[slideDown_0.3s_ease-out]">
                    {errorMessage}
                </div>
            )}
 
            <div className="bg-(--theme-secondary-bg) px-3 py-2 rounded-lg text-xs mb-2">
                <strong>Zonas permitidas:</strong>
                <ul className="mt-1 ml-5 list-disc">
                    {allowedZones.map((zone, idx) => (
                        <li key={idx}>
                            <strong>{zone.name}</strong>
                            <br />
                            <small className="opacity-70">
                                Área definida por {zone.points.length} puntos
                            </small>
                        </li>
                    ))}
                </ul>
            </div>
 
            {/* Leaflet requiere height como inline style — no procesa clases CSS externas */}
            <MapContainer
                center={mapCenter}
                zoom={16}
                style={{ height: "320px" }}
                className="rounded-2xl"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
 
                {allowedZones.map((zone, idx) => (
                    <Polygon
                        key={idx}
                        positions={zone.points}
                        pathOptions={{
                            color: idx === 0 ? "#4CAF50" : "#2196F3",
                            fillColor: idx === 0 ? "#4CAF50" : "#2196F3",
                            fillOpacity: 0.2,
                            weight: 2,
                        }}
                    />
                ))}
 
                <Marker position={[lat, lng]} />
                <MapEvents
                    setLat={setLat}
                    setLng={setLng}
                    onLocationChange={handleLocationChange}
                />
            </MapContainer>
 
            <div>
                <h4 className="font-bold mb-1">Ubicacion</h4>
                <div className="flex gap-2.5">
                    <div className="flex-1">
                        <label className="text-xs opacity-70">Latitud</label>
                        <input
                            value={lat.toFixed(6)}
                            readOnly
                            className="w-full px-2.5 py-2 rounded-xl border border-(--theme-border) bg-(--theme-secondary-bg) text-(--theme-text)"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-xs opacity-70">Longitud</label>
                        <input
                            value={lng.toFixed(6)}
                            readOnly
                            className="w-full px-2.5 py-2 rounded-xl border border-(--theme-border) bg-(--theme-secondary-bg) text-(--theme-text)"
                        />
                    </div>
                </div>
            </div>
 
            <div>
                <h4 className="font-bold mb-1">Tipo de lugar</h4>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as LocationType)}
                    className="w-full px-2.5 py-2 rounded-xl border border-(--theme-border) bg-(--theme-bg) text-(--theme-text)"
                >
                    <option value="AULA">Aula</option>
                    <option value="LABORATORIO">Laboratorio</option>
                    <option value="OFICINA">Oficina</option>
                    <option value="AUDITORIO">Auditorio</option>
                    <option value="BIBLIOTECA">Biblioteca</option>
                    <option value="CENTRO DE ESTUDIANTES">Centro de estudiantes</option>
                    <option value="CAFETERIA">Cafeteria</option>
                    <option value="OTRO">Otro</option>
                </select>
            </div>
 
            <div>
                <h4 className="font-bold mb-1">Detalles de la ubicacion</h4>
                <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Ej: Aula 962 - Facultad de Tecnología"
                    className="w-full px-2.5 py-2 rounded-xl border border-(--theme-border) bg-(--theme-bg) text-(--theme-text)"
                />
            </div>
 
            <button
                onClick={handleSave}
                className="bg-(--color-primary) text-white py-3 rounded-full font-bold mt-1.5 cursor-pointer"
            >
                Guardar
            </button>
        </div>
    );
}
