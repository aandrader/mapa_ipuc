"use client";

import { useState } from "react";
import { Schedule } from "./Schedule";
import { TemplePhoto } from "./TemplePhoto";
import { FormMap } from "./FormMap";
import { useInitPreviewMap } from "@/map/useInitPreviewMap";
import { uploadImage } from "@/actions/aws";
import { getImgUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { InputLabel } from "../ui/InputLabel";
import { toast } from "@/components/ui/use-toast";
import { LoaderCircleIcon } from "lucide-react";
import { fetchTempleIdType, updateTemple } from "@/actions/queries";

export const TempleTable = ({ temple }: { temple: fetchTempleIdType }) => {
  const initialImg = temple.imagen!! && getImgUrl(temple.id);
  const initialCoordinates = temple.coordenadas!;
  const [imageUrl, setImageUrl] = useState(initialImg);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [readOnly, setReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [templeLocation, setTempleLocation] = useState(initialCoordinates);
  const [services, setServices] = useState(temple.horarios);
  const map = useInitPreviewMap({ templeLocation, setTempleLocation });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as any;

    const newData = {
      facebook: data.facebook.trim(),
      youtube: data.youtube.trim(),
      instagram: data.instagram.trim(),
      pagina: data.pagina.trim(),
      coordenadas: templeLocation,
      horarios: services,
      imagen: false,
    };

    try {
      if (imageBlob) {
        const formData = new FormData();
        formData.append("file", imageBlob);
        await uploadImage(temple.id, formData);
        newData.imagen = true;
      }
      const { status } = await updateTemple(newData, temple);
      if (status === "updated" || newData.imagen) {
        toast({
          title: "Informacion actualizada correctamente",
          variant: "success",
        });
      } else {
        toast({
          title: "No hay cambios por actualizar.",
          variant: "success",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        variant: "error",
        description: "Hubo un error actualizando la información.",
      });
    }

    setIsLoading(false);
    setReadOnly(true);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(initialImg);
  };

  const onReset = (e: any) => {
    e.preventDefault();
    e.target.closest("form").reset();
    setServices(temple.horarios);
    setImageUrl(initialImg);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setTempleLocation(initialCoordinates);
    if (map) map.fire("refresh", { templeLocation: initialCoordinates });
    setReadOnly(true);
  };

  const buttons = readOnly ? (
    <Button type="button" onClick={() => setReadOnly(false)}>
      Actualizar información
    </Button>
  ) : (
    <>
      <Button type="button" disabled={isLoading} onClick={onReset}>
        Cancelar
      </Button>
      <Button disabled={isLoading}>Guardar información</Button>
    </>
  );

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:h-[calc(100vh-68px)]" onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2">
          <div>
            <h2 className="text-xl text-blue-ipuc-800 font-medium">{temple.congregacion}</h2>
            <span className="font-medium text-blue-ipuc-600">
              {temple.municipio} - Distrito {temple.distrito}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            {buttons} {isLoading && <LoaderCircleIcon strokeWidth={3} className="animate-spin" />}
          </div>
        </div>

        <InputLabel
          label="Link de página de Facebook"
          name="facebook"
          defaultValue={temple.facebook}
          readOnly={readOnly}
        />
        <InputLabel
          label="Link de página de Youtube"
          name="youtube"
          defaultValue={temple.youtube}
          readOnly={readOnly}
        />
        <InputLabel
          label="Link de Instagram"
          name="instagram"
          defaultValue={temple.instagram}
          readOnly={readOnly}
        />
        <InputLabel
          label="Link de página general"
          name="pagina"
          defaultValue={temple.pagina}
          readOnly={readOnly}
        />
        <Schedule services={services} setServices={setServices} readOnly={readOnly} />
      </div>

      <div className="flex flex-col gap-4 pb-2">
        <FormMap map={map} templeLocation={templeLocation} readOnly={readOnly} />
        <TemplePhoto
          imageUrl={imageUrl}
          readOnly={readOnly}
          setImageBlob={setImageBlob}
          setImageUrl={setImageUrl}
        />
      </div>
    </form>
  );
};
