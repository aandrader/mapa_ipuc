"use client";

import { Button } from "@/components/ui/button";
import { InputLabel } from "../ui/InputLabel";
import { toast } from "@/components/ui/use-toast";
import { updateTemple } from "@/actions/queries";
import { useRouter } from "next/navigation";
import { FormMap } from "./FormMap";
import { useState } from "react";
import { LoaderCircleIcon, X } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/actions/aws";
import { getImgUrl } from "@/utils/utils";
import { ImageDialog } from "./ImageDialog";
import { publish } from "@/utils/events";

export const TempleTable = ({ temple }: any) => {
  const initialImg = temple.imagen && getImgUrl(temple.id);
  const [imageUrl, setImageUrl] = useState(initialImg);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [readOnly, setReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [templeLocation, setTempleLocation] = useState(temple.coordenadas);
  const [services, setServices] = useState(temple.horarios);
  const [map, setMap] = useState<any>();
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as any;

    const newData: any = {
      facebook: data.facebook.trim(),
      youtube: data.youtube.trim(),
      instagram: data.instagram.trim(),
      pagina: data.pagina.trim(),
      coordenadas: templeLocation,
      horarios: services,
    };

    try {
      if (imageBlob) {
        const formData = new FormData();
        formData.append("file", imageBlob);
        await uploadImage(temple.id, formData);
        newData.imagen = true;
      }
      const { status } = await updateTemple(newData, temple);
      if (status === "no-change") {
        toast({
          title: "No hay cambios por actualizar.",
          variant: "success",
        });
      } else {
        toast({
          title: "Informacion actualizada correctamente",
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
    router.refresh();
  };

  const onReset = (e: any) => {
    e.preventDefault();
    e.target.closest("form").reset();
    setServices(temple.horarios);
    setImageUrl(initialImg);
    map.fire("refresh", { templeLocation: temple.coordenadas });
    setReadOnly(true);
  };

  const addService = () => {
    setServices([...services, { dia: "", hora: "" }]);
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

  const schedule = (
    <div className="flex gap-1 flex-col">
      <p>Horarios de culto</p>
      {services.map((horario: any, index: any) => (
        <ScheduleRow
          horario={horario}
          key={horario.dia + horario.hora}
          index={index}
          setServices={setServices}
          readOnly={readOnly}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        className={`${readOnly && "hidden"} w-min`}
        onClick={addService}
      >
        Agregar dia
      </Button>
    </div>
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

        {schedule}
      </div>

      <div className="flex flex-col gap-4 pb-2">
        <FormMap
          map={map}
          setMap={setMap}
          templeLocation={templeLocation}
          setTempleLocation={setTempleLocation}
          coordinates={temple.coordenadas}
          readOnly={readOnly}
        />
        <div className="flex flex-col gap-2">
          <p>Foto</p>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="relative w-[230px] h-[230px] grid place-items-center rounded-lg bg-slate-200">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  className="rounded-lg object-cover"
                  fill
                  sizes="300px"
                  alt="Foto iglesia"
                  priority={true}
                />
              ) : (
                <span className="font-medium text-slate-500">Sin imagen</span>
              )}
            </div>
            {!readOnly && (
              <div>
                <Button type="button" onClick={() => publish("openImageDialog")}>
                  Actualizar imagen
                </Button>
                <ImageDialog image={imageUrl} setImageUrl={setImageUrl} setImageBlob={setImageBlob} />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const ScheduleRow = ({ horario, index, setServices, readOnly }: any) => {
  const deleteService = () => {
    setServices((services: any) => services.toSpliced(index, 1));
  };

  const onChange = (e: any) => {
    e.preventDefault();
    setServices((services: any) => {
      const copy = JSON.parse(JSON.stringify(services));
      const { name, value } = e.target;
      copy[index][name] = value;
      return copy;
    });
  };
  return (
    <div className="flex gap-3">
      <select
        className="rounded-lg px-2"
        onChange={onChange}
        value={horario.dia}
        disabled={readOnly}
        name="dia"
      >
        {days.map((day) => (
          <option key={day}>{day}</option>
        ))}
      </select>
      <input type="time" readOnly={readOnly} name="hora" value={horario.hora} onChange={onChange} />
      <Button
        className={`${readOnly && "hidden"} p-1`}
        type="button"
        variant="outline"
        onClick={() => deleteService()}
      >
        <X />
      </Button>
    </div>
  );
};
