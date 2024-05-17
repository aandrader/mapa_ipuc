import templesData from "@/data/congregaciones.json";
import { templeIdType } from "@/data/templeTypes";
import { notFound, usePathname } from "next/navigation";

export const useNotFound = () => {
  const pathname = usePathname();
  if (pathname == "/") return;
  const templeId = pathname.split("/").at(-1) as templeIdType;
  const templeData = templesData[templeId];
  if (!templeData) notFound();
};
