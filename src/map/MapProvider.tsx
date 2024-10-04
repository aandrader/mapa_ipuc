"use client";
import { ReactNode, createContext, useContext } from "react";
import "leaflet/dist/leaflet.css";
import { useInitMap } from "./useInitMap";
import { fetchTemplesType } from "@/actions/queries";
import { Map } from "leaflet";

const MapContext = createContext<Map | null>(null);

export const useMap = () => useContext(MapContext) as Map;

export default function MapProvider({
  children,
  temples,
}: {
  children: ReactNode;
  temples: fetchTemplesType;
}) {
  const map = useInitMap({ temples });

  return (
    <MapContext.Provider value={map!}>
      <div id="map" className="w-screen h-screen skeleton"></div>
      {children}
    </MapContext.Provider>
  );
}
