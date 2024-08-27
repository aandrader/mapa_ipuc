"use client";

import { Button } from "@/components/ui/button";
import { InputLabel } from "./InputLabel";
import { toast } from "@/components/ui/use-toast";
import { updateTemple } from "@/actions/queries";
import { useRouter } from "next/navigation";
import { FormMap } from "./FormMap";
import { useState } from "react";
import { LoaderCircleIcon, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/actions/aws";
import { getImgUrl } from "@/utils/utils";

export const TempleTable = ({ temple }: any) => {
  const initialImg = temple.imagen && getImgUrl(temple.id);
  const [readOnly, setReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [templeLocation, setTempleLocation] = useState(temple.coordenadas);
  const [image, setImage] = useState(initialImg);
  const [services, setServices] = useState(temple.horarios);
  const [map, setMap] = useState<any>();
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const newData: any = {
      facebook: data.facebook,
      youtube: data.youtube,
      instagram: data.instagram,
      pagina: data.pagina,
      coordenadas: templeLocation,
      horarios: services,
    };

    try {
      if (initialImg !== image) {
        const formData = new FormData();
        formData.append("file", data.imagen);
        await uploadImage(temple.id, formData);
        newData.imagen = true;
      }
      await updateTemple(newData, temple);
      toast({
        title: "Informacion actualizada correctamente",
        variant: "success",
        // description: "Hubo un error actualizando la información.",
      });
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
    setImage(initialImg);
    map.fire("refresh", { templeLocation: temple.coordenadas });
    setReadOnly(true);
  };

  const onSelectImage = (e: any) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
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
              {image ? (
                <Image
                  src={image}
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
                <p>Actualizar imagen</p>
                <Input name="imagen" type="file" onChange={onSelectImage} />
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
