// import { MapContainer, TileLayer } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet-map.css";
import MapControl from "./MapControl";


function MapView() {
  return (
    <div>
      <MapContainer center={[6.23, -75.58]} zoom={12} id="map-container">
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      
        />
        <MapControl></MapControl>
      </MapContainer>
    </div>
  );
}

export default MapView;
