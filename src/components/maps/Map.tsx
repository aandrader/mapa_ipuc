import { useUserLocation } from "@/hooks/useUserLocation";
import { Marker } from "react-leaflet";
import { Markers } from "./Markers";
import { locationIcon } from "@/utils/leafletIcons";
// import { useFlyto } from "@/hooks/useFlyto";
import { useSetMapContext } from "@/hooks/useSetMapContext";

export const Map = () => {
  useSetMapContext();
  const userLocation = useUserLocation();
  // useFlyto();
  const locationMarker = userLocation ? <Marker position={userLocation} icon={locationIcon} /> : null;

  return (
    <>
      <Markers />
      {locationMarker}
    </>
  );
};
