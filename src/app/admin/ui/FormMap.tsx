import { initPreviewMap } from "@/map/initPreviewMap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { MapsIcon } from "@/components/Icons";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export const FormMap = ({ map, setMap, setTempleLocation, templeLocation, coordinates, readOnly }: any) => {
  useEffect(() => {
    import("leaflet").then((L) => initPreviewMap({ L, setMap, setTempleLocation, coordinates }));
    return () => {
      map?.remove();
    };
    // eslint-disable-next-line
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      map!.locate({ enableHighAccuracy: true });
    } else {
      toast({
        title: "Error",
        variant: "error",
        description: "El navegador que estas usando no admite obtener tu ubicacion actual.",
      });
    }
  };
  return (
    <div className="flex flex-col gap-2 ">
      <p>Ubicación</p>
      <div id="map" className="w-full h-[40vh] skeleton"></div>
      <Alert variant="destructive" className={`${readOnly && "hidden"}`}>
        <Info className="h-4 w-4" />
        <AlertTitle>Advertencia</AlertTitle>
        <AlertDescription>
          Para obtener la ubicación del templo, es necesario pararse en la entrada del mismo y con el botón a
          continuación actualizar la ubicación desde un celular o una tablet, ya que estos cuentan con una
          geolocalización más precisa.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 md:flex gap-2">
        <Button type="button" onClick={() => getLocation()} className={`${readOnly && "hidden"}`}>
          Actualizar ubicación
        </Button>
        <IconButton
          className="w-[100%] font-medium bg-gradient-to-r from-blue-ipuc-700 to-blue-500  "
          href={"https://www.google.com/maps/place/" + templeLocation.join(",")}
        >
          <MapsIcon /> Ir al templo
        </IconButton>
      </div>
    </div>
  );
};
