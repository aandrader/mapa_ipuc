import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { Map } from "./Map";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getTemples } from "@/utils/maps";
import { templeIdType } from "@/data/templeTypes";
import { ZoomControl } from "react-leaflet";

export default function MapWrapper({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const templesData = getTemples();
  const templeCoords = templesData[pathname.split("/").at(-1) as templeIdType];
  const initialCoords = templeCoords?.coordenadas ?? [6.23, -75.58];

  return (
    <>
      <MapContainer
        center={initialCoords}
        zoomControl={false}
        zoom={templeCoords ? 16 : 13}
        className="w-screen h-screen "
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <Map />
        {children}
      </MapContainer>
    </>
  );
}
