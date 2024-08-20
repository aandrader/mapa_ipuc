import { churchMarker } from "@/utils/markersRaw";
import { LatLngTuple, Map } from "leaflet";

export const initPreviewMap = async ({ L, setMap, setTempleLocation, coordinates }: any) => {
  const mapDiv = document.getElementById("map");
  mapDiv?.classList.remove("skeleton");

  const initialCoordinates = coordinates ?? [6.23, -75.58];
  const initialZoom = coordinates ? 15 : 4;

  const map = L.map("map", { zoomControl: false }).setView(initialCoordinates, initialZoom) as Map;

  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  const markerGroup = L.layerGroup().addTo(map);
  const icon = L.divIcon({ html: churchMarker, className: "" });

  if (coordinates) {
    const marker = L.marker(coordinates, { icon: icon }).on("click", () => {
      map.flyTo(coordinates, 16, { duration: 1.5 });
    });
    markerGroup.addLayer(marker);
  }

  map.on("locationfound", (e) => {
    markerGroup.clearLayers();
    const userLocation = [e.latlng.lat, e.latlng.lng] as LatLngTuple;
    setTempleLocation(userLocation);
    map.flyTo(userLocation, 16, { duration: 1.5 });
    const marker = L.marker(userLocation, { icon: icon }).on("click", () => {
      map.flyTo(userLocation, 16, { duration: 1.5 });
    });
    markerGroup.addLayer(marker);
  });

  map.on("refresh", (e) => {
    markerGroup.clearLayers();
    const templeLocation = (e as any).templeLocation;
    setTempleLocation(templeLocation);
    map.flyTo(templeLocation, 16, { duration: 1.5 });
    const marker = L.marker(templeLocation, { icon: icon }).on("click", () => {
      map.flyTo(templeLocation, 16, { duration: 1.5 });
    });
    markerGroup.addLayer(marker);
  });

  setMap(map);
};
