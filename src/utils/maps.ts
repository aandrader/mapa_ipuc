import { LatLngTuple, Map } from "leaflet";
import templesData from "@/data/congregaciones.json";
import { templeDataType, templeIdType } from "@/data/templeTypes";

export const getTemples = () => {
  return templesData as { [key in templeIdType]: templeDataType };
};

export const getSortedTemples = (map?: Map, userLocation?: LatLngTuple | []) => {
  if (userLocation && userLocation?.length !== 0 && map) {
    const array = Object.entries(templesData).sort(
      ([_, a], [__, b]) =>
        map.distance(userLocation, a.coordenadas as LatLngTuple) -
        map.distance(userLocation, b.coordenadas as LatLngTuple)
    );
    return array as [string, templeDataType][];
  } else return Object.entries(getTemples()) as [string, templeDataType][];
};
