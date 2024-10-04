import { churchMarker, locationMarker } from "@/utils/markers";
import { Map } from "leaflet";
import { fetchTempleId, fetchTemplesType } from "@/actions/queries";
import { useEffect, useState } from "react";
import { useUserLocation } from "./UserLocationProvider";
import { useRouter } from "next/navigation";

async function isLocationAllowed() {
  try {
    const result = await navigator.permissions.query({ name: "geolocation" });
    return result.state === "granted";
  } catch (error) {
    console.error("Error checking location permission:", error);
    return false;
  }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
  });
}

const setInitialView = async (map: Map) => {
  if (location.pathname !== "/") {
    const templeId = location.pathname.split("/").at(-1)!;
    const { coordenadas } = await fetchTempleId(templeId);
    map.setView(coordenadas!, 16) as Map;
    map.locate({ enableHighAccuracy: true });
  } else if (await isLocationAllowed()) {
    const pos = await getCurrentPosition();
    map.setView([pos.coords.latitude, pos.coords.longitude], 13);
    map.fire("locationfound", { latlng: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
  } else {
    map.setView([6.23, -75.58], 13);
    map.locate({ enableHighAccuracy: true });
  }
};

export const useInitMap = ({ temples }: { temples: fetchTemplesType }) => {
  const [map, setMap] = useState<Map>();
  const router = useRouter();
  const { setUserLocation } = useUserLocation();

  const initMap = async () => {
    const L = await import("leaflet");
    const mapDiv = document.getElementById("map");
    mapDiv?.classList.remove("skeleton");

    const map = L.map("map", { zoomControl: false });
    L.control.zoom({ position: "bottomright" }).addTo(map);

    map.on("locationfound", (e) => {
      setUserLocation([e.latlng.lat, e.latlng.lng]);
      const icon = L.divIcon({ html: locationMarker, className: "" });
      L.marker([e.latlng.lat, e.latlng.lng], { icon: icon }).addTo(map);
      if (location.pathname === "/") map.flyTo(e.latlng, 13);
    });

    await setInitialView(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    for (const { id, coordenadas } of temples) {
      const icon = L.divIcon({ html: churchMarker, className: "" });
      const marker = L.marker(coordenadas!, { icon: icon }).on("click", () => {
        router.push(`/${id}`);
        map.flyTo(coordenadas!, 16, { duration: 1.5 });
      });
      marker.addTo(map);
    }

    setMap(map);
  };

  useEffect(() => {
    initMap();

    return () => {
      map?.remove();
    };
    // eslint-disable-next-line
  }, []);

  return map;
};
