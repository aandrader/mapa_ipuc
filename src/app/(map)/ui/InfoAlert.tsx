import { InfoIcon, LocationIcon } from "@/components/Icons";
import { useMap } from "@/map/MapProvider";
import { useUserLocation } from "@/map/UserLocationProvider";

export const InfoAlert = () => {
  const map = useMap();
  const { userLocation } = useUserLocation();
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
