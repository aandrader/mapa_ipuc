"use client";

import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { InputLabel } from "./InputLabel";
import { toast } from "@/components/ui/use-toast";
import { updateTemple } from "@/actions/queries";
import { useRouter } from "next/navigation";
import { FormMap } from "./FormMap";
import { useState } from "react";
import { X } from "lucide-react";

export const TempleTable = ({ temple }: any) => {
  const [readOnly, setReadOnly] = useState(true);
  const [templeLocation, setTempleLocation] = useState(temple.coordenadas);
  const [services, setServices] = useState(temple.horarios);
  const [map, setMap] = useState<any>();
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const newData = {
      facebook: data.facebook,
      youtube: data.youtube,
      instagram: data.instagram,
      pagina: data.pagina,
      coordenadas: templeLocation,
      horarios: services,
    };

    try {
      await updateTemple(newData, temple);
      toast({
        title: "Informacion actualizada correctamente",
        variant: "success",
        // description: "Hubo un error actualizando la información.",
      });
    } catch {
      toast({
        title: "Error",
        variant: "error",
        description: "Hubo un error actualizando la información.",
      });
    }
    setReadOnly(true);
    router.refresh();
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
      <Button
        type="button"
        onClick={() => {
          setReadOnly(true);
          map.fire("refresh", { templeLocation: temple.coordenadas });
          router.refresh();
        }}
      >
        Cancelar
      </Button>
      <Button>Guardar información</Button>
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
          <div className="flex gap-2">{buttons}</div>
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

      <div className="">
        <FormMap
          map={map}
          setMap={setMap}
          templeLocation={templeLocation}
          setTempleLocation={setTempleLocation}
          coordinates={temple.coordenadas}
          readOnly={readOnly}
        />
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
      const copy = [...services];
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
