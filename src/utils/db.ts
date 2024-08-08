import { LatLngTuple, Map } from "leaflet";
import { templeDataType } from "@/data/templeTypes";

export const getTemples = async () => {
  const res = await fetch("db", { next: { revalidate: 10 } });
  return await res.json();
};

export const getSortedTemples = async (map?: Map, userLocation?: LatLngTuple | []) => {
  const temples = await getTemples();
  if (userLocation && userLocation?.length !== 0 && map) {
    const array = temples.sort(
      (a: any, b: any) =>
        map.distance(userLocation, a.coordenadas as LatLngTuple) -
        map.distance(userLocation, b.coordenadas as LatLngTuple)
    );
    return array as [string, templeDataType][];
  } else return temples;
};
