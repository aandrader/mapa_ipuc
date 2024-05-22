import { InfoIcon, LocationIcon } from "../Icons";
import { useMapContext } from "@/context/MapContext";

export const InfoAlert = () => {
  const { userLocation, map } = useMapContext();
  const divClass =
    "flex gap-2 text-blue-ipuc-500 items-center w-full rounded-lg bg-blue-ipuc-100 p-2 text-sm";

  return userLocation.length !== 0 ? (
    <div className={divClass}>
      <InfoIcon />
      Iglesias más cercanas según tu ubicación.
    </div>
  ) : (
    <div onClick={() => map.locate()} className={divClass + " cursor-pointer"}>
      <LocationIcon />
      Permitir ubicación para buscar iglesias más cercanas.
    </div>
  );
};
