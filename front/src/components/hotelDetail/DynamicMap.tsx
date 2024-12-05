"use client";

import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, Map } from "leaflet";
import { useEffect, useRef } from "react";

interface DynamicMapComponentProps {
  position: LatLngExpression;
}

const DynamicMapComponent: React.FC<DynamicMapComponentProps> = ({
  position,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    // Desmontar cualquier instancia previa del mapa
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Crear el mapa solo si hay un contenedor disponible
    if (mapContainerRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        position,
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      L.marker(position)
        .addTo(mapInstanceRef.current)
        .bindPopup("This is the location")
        .openPopup();
    }

    // Cleanup al desmontar el componente
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [position]);

  return (
    <div
      ref={mapContainerRef}
      id="map-container"
      style={{ width: "100%", height: "220px" }}
    />
  );
};

export default DynamicMapComponent;
