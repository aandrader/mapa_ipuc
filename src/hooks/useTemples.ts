import { useMap } from "@/context/MapContext";
import { useUserLocation } from "@/context/UserLocationContext";
import { templeDataType } from "@/data/templeTypes";
import { getSortedTemples } from "@/utils/maps";
import { useEffect, useState } from "react";

export const useTemples = () => {
  const map = useMap();
  const { userLocation } = useUserLocation();
  const [sortedTemples, setSortedTemples] = useState<[string, templeDataType][]>([]);
  const [filteredTemples, setFilteredTemples] = useState<[string, templeDataType][]>(
    getSortedTemples(map, userLocation)
  );
  useEffect(() => {
    const res = getSortedTemples(map, userLocation);
    setSortedTemples(res);
    setFilteredTemples(res);
  }, [userLocation, map]);

  return { sortedTemples, filteredTemples, setFilteredTemples };
};
