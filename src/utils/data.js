import templesData from "../assets/congregaciones.json";
import { icon } from "leaflet";



  export function getTemples(map = false, userLocation = false) {
    if(userLocation[0] != false && map != false){

      var array = templesData;
      array.sort(
        (a, b) =>
          map.distance(userLocation, a.coordenadas) -
          map.distance(userLocation, b.coordenadas)
      );

      return array;
    }else{
      return templesData
    }

  }


  export const templeIcon = icon({
    iconUrl: "/ChurchMarker.svg",
    iconRetinaUrl: "/ChurchMarker.svg",
    iconSize: [35, 35],
    // iconAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    // className: "leaflet-venue-icon",
  });

  export const locationIcon = icon({
    iconUrl: "/LocationMarker.svg",
    iconRetinaUrl: "/LocationMarker.svg",
    iconSize: [35, 35],
    // iconAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    // className: "leaflet-venue-icon",
  });

