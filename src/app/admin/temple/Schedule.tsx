import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import { SetStateAction, Dispatch } from "react";

type service = {
  dia: string;
  hora: string;
};

interface Props {
  services: service[];
  setServices: Dispatch<
    SetStateAction<
      {
        dia: string;
        hora: string;
      }[]
    >
  >;
  readOnly: boolean;
}

export const Schedule = ({ services, setServices, readOnly }: Props) => {
  const addService = () => {
    setServices([...services, { dia: "", hora: "" }]);
  };

  return (
    <div className="flex gap-1 flex-col">
      <p>Horarios de culto</p>
      {services.map((service, index) => (
        <ScheduleRow
          service={service}
          key={service.dia + service.hora}
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
};

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

interface ScheduleRowProps {
  service: service;
  index: number;
  setServices: Dispatch<
    SetStateAction<
      {
        dia: string;
        hora: string;
      }[]
    >
  >;
  readOnly: boolean;
}

const ScheduleRow = ({ service, index, setServices, readOnly }: ScheduleRowProps) => {
  const deleteService = () => {
    setServices((services) => services.toSpliced(index, 1));
  };

  const onChange = (e: any) => {
    e.preventDefault();
    setServices((services) => {
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
        value={service.dia}
        disabled={readOnly}
        name="dia"
      >
        {days.map((day) => (
          <option key={day}>{day}</option>
        ))}
      </select>
      <input type="time" readOnly={readOnly} name="hora" value={service.hora} onChange={onChange} />
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
