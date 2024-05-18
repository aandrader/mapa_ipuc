import { useMapContext } from "@/context/MapContext";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const useSetMapContext = () => {
  const map = useMap();
  const { setMap } = useMapContext();
  useEffect(() => {
    setMap(map);
  }, [map, setMap]);
};
