"use client";
import { LatLngTuple } from "leaflet";
import { useContext, createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type userLocationType = LatLngTuple | [];

type contextType = {
  userLocation: userLocationType;
  setUserLocation: Dispatch<SetStateAction<userLocationType>>;
};

const UserLocationContext = createContext<contextType | null>(null);

export const useUserLocation = () => useContext(UserLocationContext) as contextType;

export default function UserLocationProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<userLocationType>([]);
  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
}
