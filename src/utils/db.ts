import { LatLngTuple, Map } from "leaflet";
import { templeDataType } from "@/data/templeTypes";

export const getTemples = async () => {
  const res = await fetch("db");
  return await res.json();
};

export const getSortedTemples = async (map?: Map, userLocation?: LatLngTuple | []) => {
  const temples = (await getTemples()) as templeDataType;
  if (userLocation && userLocation?.length !== 0 && map) {
    const array = Object.entries(temples).sort(
      ([_, a], [__, b]) =>
        map.distance(userLocation, a.coordenadas as LatLngTuple) -
        map.distance(userLocation, b.coordenadas as LatLngTuple)
    );
    return array as [string, templeDataType][];
  } else return Object.entries(temples) as [string, templeDataType][];
};
