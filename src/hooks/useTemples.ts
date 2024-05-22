import { useMapContext } from "@/context/MapContext";
import { templeDataType } from "@/data/templeTypes";
import { getSortedTemples } from "@/utils/maps";
import { useEffect, useState } from "react";

export const useTemples = () => {
  const { map, userLocation } = useMapContext();
  const [sortedTemples, setSortedTemples] = useState<[string, templeDataType][]>([]);
  const [filteredTemples, setFilteredTemples] = useState<[string, templeDataType][]>([]);
  useEffect(() => {
    const res = getSortedTemples(map, userLocation);
    setSortedTemples(res);
    setFilteredTemples(res);
  }, [userLocation, map]);

  return { sortedTemples, filteredTemples, setFilteredTemples };
};
