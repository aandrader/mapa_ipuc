"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { type Map } from "leaflet";
import { useUserLocation } from "./UserLocationContext";
import { initMap } from "./initMap";

const MapContext = createContext<any>({});

export const useMap = () => useContext(MapContext);

export default function MapProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Map>();
  const router = useRouter();
  const { setUserLocation } = useUserLocation();

  useEffect(() => {
    import("leaflet").then((L) => initMap({ L, setMap, setUserLocation, router }));
    return () => {
      map?.remove();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <MapContext.Provider value={map}>
      <div id="map" className="w-screen h-screen skeleton"></div>
      {children}
    </MapContext.Provider>
  );
}
