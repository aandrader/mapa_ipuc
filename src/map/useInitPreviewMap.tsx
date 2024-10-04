import { churchMarker } from "@/utils/markers";
import { type Map } from "leaflet";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  templeLocation: [number, number];
  setTempleLocation: Dispatch<SetStateAction<[number, number]>>;
}

export const useInitPreviewMap = ({ templeLocation, setTempleLocation }: Props) => {
  const [map, setMap] = useState<Map>();

  const initPreviewMap = async () => {
    const L = await import("leaflet");
    const mapDiv = document.getElementById("map");
    mapDiv?.classList.remove("skeleton");

    const initialCoordinates = templeLocation ?? [6.23, -75.58];
    const initialZoom = templeLocation ? 15 : 4;

    const map = L.map("map", { zoomControl: false }).setView(initialCoordinates, initialZoom) as Map;

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    const markerGroup = L.layerGroup().addTo(map);
    const icon = L.divIcon({ html: churchMarker, className: "" });

    if (templeLocation) {
      const marker = L.marker(templeLocation, { icon: icon }).on("click", () => {
        map.flyTo(templeLocation, 16, { duration: 1.5 });
      });
      markerGroup.addLayer(marker);
    }

    map.on("locationfound", (e) => {
      markerGroup.clearLayers();
      const userLocation = [e.latlng.lat, e.latlng.lng] as [number, number];
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
      if (!templeLocation) return;

      setTempleLocation(templeLocation);
      map.flyTo(templeLocation, 16, { duration: 1.5 });
      const marker = L.marker(templeLocation, { icon: icon }).on("click", () => {
        map.flyTo(templeLocation, 16, { duration: 1.5 });
      });

      markerGroup.addLayer(marker);
    });

    setMap(map);
  };
  useEffect(() => {
    initPreviewMap();
    return () => {
      map?.remove();
    };
    // eslint-disable-next-line
  }, []);

  return map;
};
