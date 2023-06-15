/* eslint-disable no-undef */
import { Marker, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import congregationsData from "../../assets/congregaciones.json";
import { isMobile, isDesktopBrowser } from "react-device-detect";

const congregationIcon = L.icon({
  iconUrl: "../../../public/ChurchMarker.svg",
  iconRetinaUrl: "../../../public/ChurchMarker.svg",
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});

function Markers({ getCardData, getCardList, getMapInstance}) {
  const [userLocation, setUserLocation] = useState(null);

  const map = useMap();
  
  const congregationMarkers = congregationsData.map((Congregacion, i) => (
    <>
      <Marker
        key={i}
        position={Congregacion.coordenadas}
        icon={congregationIcon}
        eventHandlers={{
          click: (e) => {
            getCardData(Congregacion);
          },
        }}
      />
    </>
  ));

  useEffect(() => {
    
    // map.locate({ enableHighAccuracy: true }).on("locationfound", function (e) {
    //   setUserLocation(e.latlng);
    //   // map.flyTo(e.latlng, map.getZoom());
    //   const array = congregationsData;
    //   array.sort(
    //     (a, b) =>
    //       map.distance(e.latlng, a.coordenadas) -
    //       map.distance(e.latlng, b.coordenadas)
    //   );
    //   getCardList(array)
      
    // }
    // ).on("locationerror", function () {
    //   getCardList(congregationsData)
      
    // });
    getMapInstance(map);
    
  }, []);

  return userLocation === null ? congregationMarkers : (
    <>
      {congregationMarkers}
      <Marker position={userLocation} />
    </>
  );
}

export { Markers };
