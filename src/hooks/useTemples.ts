import { getSortedTemples } from "@/utils/db";
import { useMap } from "@/context/MapContext";
import { useUserLocation } from "@/context/UserLocationContext";
import { templeDataType } from "@/data/templeTypes";

import { useEffect, useState } from "react";

export const useTemples = () => {
  const map = useMap();
  const { userLocation } = useUserLocation();
  const [sortedTemples, setSortedTemples] = useState<[string, templeDataType][]>([]);
  const [filteredTemples, setFilteredTemples] = useState<[string, templeDataType][]>([]);
  useEffect(() => {
    const fetchTemples = async () => {
      const res = await getSortedTemples(map, userLocation);
      setSortedTemples(res);
      setFilteredTemples(res);
    };
    fetchTemples();
  }, [userLocation, map]);

  return { sortedTemples, filteredTemples, setFilteredTemples };
};
