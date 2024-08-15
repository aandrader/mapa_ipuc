"use client";

import { Button } from "@/components/ui/button";
import { initPreviewMap } from "@/map/initPreviewMap";
import { type Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { InputLabel } from "./InputLabel";
import { toast } from "@/components/ui/use-toast";
import { updateTemple } from "@/actions/queries";

export const TempleTable = ({ temple }: any) => {
  const [readOnly, setReadOnly] = useState(true);
  const [templeLocation, setTempleLocation] = useState(temple.coordenadas);
  const [services, setServices] = useState(temple.horarios);

  const addService = () => {
    setServices([...services, { dia: "", hora: "" }]);
  };

  const buttons = readOnly ? (
    <Button type="button" onClick={() => setReadOnly(false)}>
      Actualizar información
    </Button>
  ) : (
    <>
      <Button type="button" onClick={() => setReadOnly(true)}>
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

      <Button type="button" className={`${readOnly && "hidden"} w-min`} onClick={addService}>
        Agregar dia
      </Button>
    </div>
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const newData = {
      facebook: data.facebook,
      youtube: data.youtube,
      pagina: data.pagina,
      coordenadas: templeLocation,
      horarios: services,
    };

    await updateTemple(newData, temple);
    setReadOnly(true);
  };

  return (
    <form className="grid grid-cols-2 gap-10 p-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
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
          label="Link de página general"
          name="pagina"
          defaultValue={temple.pagina}
          readOnly={readOnly}
        />
        {schedule}
      </div>

      <FormMap setTempleLocation={setTempleLocation} coordinates={temple.coordenadas} readOnly={readOnly} />
    </form>
  );
};

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const ScheduleRow = ({ horario, index, setServices, readOnly }: any) => {
  const deleteService = (index: number) => {
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
      <Button className={`${readOnly && "hidden"}`} type="button" onClick={() => deleteService}>
        Eliminar día
      </Button>
    </div>
  );
};

const FormMap = ({ setTempleLocation, coordinates, readOnly }: any) => {
  const [map, setMap] = useState<Map>();
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
    <div className="flex flex-col gap-2">
      <div id="map" className="w-full h-[50%] skeleton"></div>
      <Button className={`${readOnly && "hidden"}`} type="button" onClick={() => getLocation()}>
        Ingresar ubicacion actual
      </Button>
    </div>
  );
};
