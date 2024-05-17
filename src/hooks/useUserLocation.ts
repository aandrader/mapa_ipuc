import { type LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { usePathname } from "next/navigation";
import { useMapContext } from "@/context/MapContext";

export const useUserLocation = () => {
  const [userLocation, setLocation] = useState<LatLngTuple | null>(null);
  const pathname = usePathname();
  const { setUserLocation } = useMapContext();
  const map = useMapEvents({
    locationfound(e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
      setUserLocation([e.latlng.lat, e.latlng.lng]);
      if (pathname === "/") map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return userLocation;
};
