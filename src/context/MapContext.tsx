import { Map } from "leaflet";
import { ReactNode, createContext, useContext, useState } from "react";

export const MapContext = createContext<any>({});

export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState([]);

  return (
    <MapContext.Provider value={{ map, setMap, userLocation, setUserLocation }}>
      {children}
    </MapContext.Provider>
  );
};
