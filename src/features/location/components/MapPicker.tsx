// components/MapPicker.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Polygon } from "react-leaflet";
import { useLocation } from "../hooks/useLocation";
import { useZoneValidation } from "../hooks/useZoneValidation";
import { saveLocation } from "../services/locationService";
import type { LocationType } from "../types";
import "leaflet/dist/leaflet.css";

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

  const handleSave = async () => {
    if (!validateBeforeSave(lat, lng)) {
      return;
    }

    const payload = {
      userId: "TEMP_USER",
      lat,
      lng,
      label,
      type,
      isDefault: true,
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
    <div className="bg-[var(--theme-card-bg)] text-[var(--theme-text)] p-4 rounded-2xl border border-[var(--theme-border)] flex flex-col gap-3.5">
      <h1 className="font-extrabold text-lg">
        Seleccionar ubicación
      </h1>

      {showError && errorMessage && (
        <div className="bg-red-500 text-white p-3 rounded-xl mb-2.5 text-sm whitespace-pre-line animate-slideDown">
          {errorMessage}
        </div>
      )}

      <div className="bg-[var(--theme-secondary-bg)] p-3 rounded-lg text-xs mb-2">
        <strong>Zonas permitidas:</strong>
        <ul className="mt-1 ml-5 list-disc">
          {allowedZones.map((zone, idx) => (
            <li key={idx} className="mb-1">
              <strong>{zone.name}</strong>
              <br />
              <span className="opacity-70 text-xs">
                Área definida por {zone.points.length} puntos
              </span>
            </li>
          ))}
        </ul>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={16}
        className="h-80 rounded-xl z-0"
        style={{ borderRadius: "1rem" }}
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

      {/* Ubicación */}
      <div>
        <h4 className="font-bold mb-2">Ubicación</h4>
        <div className="flex gap-2.5">
          <div className="flex-1">
            <label className="text-xs opacity-70 block mb-1">Latitud</label>
            <input
              value={lat.toFixed(6)}
              readOnly
              className="w-full p-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-secondary-bg)] text-[var(--theme-text)] text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs opacity-70 block mb-1">Longitud</label>
            <input
              value={lng.toFixed(6)}
              readOnly
              className="w-full p-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-secondary-bg)] text-[var(--theme-text)] text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tipo de lugar */}
      <div>
        <h4 className="font-bold mb-2">Tipo de lugar</h4>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as LocationType)}
          className="w-full p-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-text)] text-sm"
        >
          <option value="AULA">Aula</option>
          <option value="LABORATORIO">Laboratorio</option>
          <option value="OFICINA">Oficina</option>
          <option value="AUDITORIO">Auditorio</option>
          <option value="BIBLIOTECA">Biblioteca</option>
          <option value="CENTRO DE ESTUDIANTES">Centro de estudiantes</option>
          <option value="CAFETERIA">Cafetería</option>
          <option value="OTRO">Otro</option>
        </select>
      </div>

      {/* Detalles de la ubicación */}
      <div>
        <h4 className="font-bold mb-2">Detalles de la ubicación</h4>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Ej: Aula 962 - Facultad de Tecnología"
          className="w-full p-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-text)] text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Botón Guardar */}
      <button
        onClick={handleSave}
        className="bg-[#88b04b] hover:bg-[#7a9e43] text-white p-3 rounded-full font-bold mt-1.5 cursor-pointer transition-colors"
      >
        Guardar ubicación
      </button>
    </div>
  );
}