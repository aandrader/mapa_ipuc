"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getTemples } from "@/utils/maps";
import { templeIdType } from "@/data/templeTypes";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { type Map } from "leaflet";
import { useUserLocation } from "./UserLocationContext";
import { churchMarker, locationMarker } from "@/utils/markersRaw";

const MapContext = createContext<any>({});

export const useMap = () => useContext(MapContext);

export default function MapProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Map>();

  const pathname = usePathname();
  const router = useRouter();
  const { setUserLocation } = useUserLocation();

  useEffect(() => {
    import("leaflet").then((L) => {
      const mapDiv = document.getElementById("map");
      mapDiv?.classList.remove("skeleton");
      const templesData = getTemples();
      const templeCoords = templesData[pathname.split("/").at(-1) as templeIdType];
      const initialCoords = templeCoords?.coordenadas ?? [6.23, -75.58];
      // Crear el mapa
      const map = L.map("map", { zoomControl: false }).setView(initialCoords, templeCoords ? 16 : 13);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Agregar una capa de mapa
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      for (const [templeID, templeData] of Object.entries(getTemples())) {
        const icon = L.divIcon({ html: churchMarker, className: "" });
        const marker = L.marker(templeData.coordenadas, { icon: icon }).on("click", () => {
          router.push(`/${templeID}`);
          map.flyTo(templeData.coordenadas, 16, { duration: 1.5 });
        });
        marker.addTo(map);
      }

      map.on("locationfound", (e) => {
        setUserLocation([e.latlng.lat, e.latlng.lng]);
        const icon = L.divIcon({ html: locationMarker, className: "" });
        L.marker([e.latlng.lat, e.latlng.lng], { icon: icon }).addTo(map);
        if (pathname === "/") map.flyTo(e.latlng, 16);
      });
      map.locate({ enableHighAccuracy: true });
      setMap(map);
    });

    // Limpiar el mapa al desmontar el componente
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
