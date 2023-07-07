import templesData from "../assets/congregaciones.json";
import { icon } from "leaflet";

export function getTemples(map = false, userLocation = false) {
  if (userLocation[0] != false && map != false) {
    var array = templesData;
    array.sort(
      (a, b) =>
        map.distance(userLocation, a.coordenadas) -
        map.distance(userLocation, b.coordenadas)
    );

    return array;
  } else {
    return templesData;
  }
}
export const defaultSchedule = [
  { dia: "Martes", hora: "6:30PM" },
  { dia: "Jueves", hora: "6:30PM" },
  { dia: "Sábado", hora: "6:30PM" },
  { dia: "Domingo", hora: "9:30AM" },
];

export const templeIcon = icon({
  iconUrl: "/ChurchMarker.svg",
  iconRetinaUrl: "/ChurchMarker.svg",
  iconSize: [35, 35],
});

export const locationIcon = icon({
  iconUrl: "/LocationMarker.svg",
  iconRetinaUrl: "/LocationMarker.svg",
  iconSize: [35, 35],
});
