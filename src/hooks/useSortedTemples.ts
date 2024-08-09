import { useMap } from "@/map/MapProvider";
import { useUserLocation } from "@/map/UserLocationProvider";
import { LatLngTuple } from "leaflet";
import { useMemo } from "react";

export const useSortedTemples = (temples: any) => {
  const map = useMap();
  const { userLocation } = useUserLocation();
  return useMemo(() => {
    if (userLocation && userLocation?.length !== 0 && map) {
      const array = temples.sort(
        (a: any, b: any) =>
          map.distance(userLocation, a.coordenadas as LatLngTuple) -
          map.distance(userLocation, b.coordenadas as LatLngTuple)
      );
      return array;
    } else return temples;
  }, [temples, map, userLocation]);
};
