import { getTemples } from "@/utils/maps";
import { Marker, useMap } from "react-leaflet";
import { useRouter } from "next/navigation";
import { templeIcon } from "@/utils/leafletIcons";

export const Markers = () => {
  const router = useRouter();
  const markersObject = getTemples();
  const map = useMap();

  return Object.entries(markersObject).map(([templeId, temple]) => (
    <Marker
      position={temple.coordenadas}
      icon={templeIcon}
      eventHandlers={{
        click: () => {
          router.push(`/${templeId}`);
          map.flyTo(temple.coordenadas, 16, { duration: 1.5 });
        },
      }}
      key={temple.congregacion + temple.municipio + temple.distrito}
    />
  ));
};
