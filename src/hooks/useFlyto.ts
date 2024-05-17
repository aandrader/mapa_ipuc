import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { getTemples } from "@/utils/maps";
import { usePathname } from "next/navigation";
import { templeIdType } from "@/data/templeTypes";

export const useFlyto = () => {
  const map = useMap();
  const pathname = usePathname();

  useEffect(() => {
    const templeID = pathname.split("/").at(-1);
    const templeData = getTemples();
    const temple = templeData[templeID as templeIdType];

    if (temple) map.flyTo(temple.coordenadas, 16, { duration: 1.5 });
  }, [pathname, map]);
};
