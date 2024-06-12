"use client";
import { useBackdrop } from "@/hooks/useBackdrop";
import { subscribe, unsubscribe } from "@/utils/events";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, IconInstagram, IconLinkedin } from "../Icons";

export const Dialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useBackdrop(setIsOpen);

  useEffect(() => {
    subscribe("openDialog", () => setIsOpen(true));
    return () => {
      unsubscribe("openDialog", () => setIsOpen(true));
    };
  }, []);
  return isOpen ? (
    <div className="absolute top-0 right-0 w-screen h-screen bg-blur above-map ">
      <div ref={dialogRef} className={`absolute absolute-center text-[15px] z-[9000] card p-5 w-[300px] `}>
        <div className="flex items-center">
          <h1 className="font-medium text-xl w-full leading-5 text-blue-ipuc-800">¡Dios le bendiga!</h1>
          <CloseIcon className="size-8" onClick={() => setIsOpen(false)} />
        </div>
        <p className="mt-2">Soy Samuel Andrade, el desarrollador de Mapa Ipuc.</p>
        <p>
          Para agregar un templo o actualizar su información (ubicación, horarios de culto, foto o redes
          sociales) por favor hacerme la solicitud por correo.
        </p>

        <div className="flex items-center gap-1 mt-2">
          <Link className="grow" target="_blank" rel="external" href={"mailto:samuelandraderive@gmail.com"}>
            <button className="rounded-2xl bg-gradient-to-r from-blue-ipuc-700 to-blue-500 text-white gap-2 py-2 px-3 text-sm w-full ">
              ¡Enviar correo!
            </button>
          </Link>
          <div className="flex">
            <Link
              // className="ml-3"
              target="_blank"
              rel="external"
              href={"https://www.instagram.com/sam_and_riv/"}
            >
              <IconInstagram />
            </Link>
            <Link target="_blank" rel="external" href={"https://co.linkedin.com/in/samuel-andrade-0718652a8"}>
              <IconLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
