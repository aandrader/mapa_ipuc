import { getTemples } from "@/utils/db";
import { churchMarker, locationMarker } from "@/utils/markersRaw";
import { Map } from "leaflet";
import { fetchTempleId } from "@/app/db/queries";

const initialView = async () => {
  if (location.pathname !== "/") {
    const templeId = location.pathname.split("/").at(-1) as any;
    const { coordenadas } = (await fetchTempleId(templeId)) as any;
    return [coordenadas, 16];
  }
  return new Promise<[number[], number]>((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve([[pos.coords.latitude, pos.coords.longitude], 13]);
      },
      () => resolve([[6.23, -75.58], 13]),
      { timeout: 200 }
    );
  });
};

export const initMap = async ({ L, router, setMap, setUserLocation }: any) => {
  const templesData = await getTemples();
  const [initialCoords, initialZoom] = await initialView();

  const mapDiv = document.getElementById("map");
  mapDiv?.classList.remove("skeleton");

  const map = L.map("map", { zoomControl: false }).setView(initialCoords, initialZoom) as Map;

  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  for (const { id, ...templeData } of templesData as any) {
    const icon = L.divIcon({ html: churchMarker, className: "" });
    const marker = L.marker(templeData.coordenadas, { icon: icon }).on("click", () => {
      router.push(`/${id}`);
      map.flyTo(templeData.coordenadas, 16, { duration: 1.5 });
    });
    marker.addTo(map);
  }

  map.on("locationfound", (e) => {
    setUserLocation([e.latlng.lat, e.latlng.lng]);
    const icon = L.divIcon({ html: locationMarker, className: "" });
    L.marker([e.latlng.lat, e.latlng.lng], { icon: icon }).addTo(map);
    if (location.pathname === "/") map.flyTo(e.latlng, 13);
  });
  map.locate({ enableHighAccuracy: true });
  setMap(map);
};
