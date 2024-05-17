import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { Map } from "./Map";
import { ReactNode } from "react";

export default function MapWrapper({ children }: { children?: ReactNode }) {
  return (
    <>
      <MapContainer center={[6.23, -75.58]} zoom={13} className="w-screen h-screen ">
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Map />
        {children}
      </MapContainer>
    </>
  );
}
