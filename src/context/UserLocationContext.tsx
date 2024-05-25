"use client";
import { LatLngTuple } from "leaflet";
import { useContext, createContext, ReactNode, useState } from "react";

const UserLocationContext = createContext<any>({});

export const useUserLocation = () => useContext(UserLocationContext);

export default function UserLocationProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<LatLngTuple | []>([]);
  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
}
