"use client";

import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getCoordinates } from "@/helpers/hotelDetail/getCoordinates";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false, // Solo renderizado en cliente
});

const MapComponent: React.FC<{ location: string }> = ({ location }) => {
  const [position, setPosition] = useState<LatLngExpression>([4.711, -74.0721]);

  useEffect(() => {
    const getLocation = async () => {
      const coordinates = await getCoordinates(location);
      console.log(coordinates);
      if (coordinates) setPosition([coordinates.lat, coordinates.lng]);
    };
    getLocation();
  }, []);

  return <DynamicMap position={position} />;
};

export default MapComponent;
