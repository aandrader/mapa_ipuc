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
  });
  return isOpen ? (
    <div className="absolute top-0 right-0 w-screen h-screen bg-blur above-map ">
      <div ref={dialogRef} className={`absolute absolute-center z-[9000] card p-4 size-[300px]  `}>
        <CloseIcon onClick={() => setIsOpen(false)} />
        <h1>¡Dios te bendiga soy Samuel Andrade!</h1>
        <p>
          Para actualizar la informacion acerca de una iglesia, puedes enviarme un correo para la solicitud
          bla bla bla
        </p>

        <div className="flex items-center">
          <Link target="_blank" rel="external" href={"mailto:samuelandraderive@gmail.com"}>
            <button className="rounded-2xl bg-gradient-to-r from-blue-ipuc-700 to-blue-500 text-white gap-2 py-2 px-3 text-xl ">
              Enviar correo
            </button>
          </Link>
          <Link target="_blank" rel="external" href={"https://www.instagram.com/sam_and_riv/"}>
            <IconInstagram />
          </Link>
          <Link target="_blank" rel="external" href={"https://co.linkedin.com/in/samuel-andrade-0718652a8"}>
            <IconLinkedin />
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};
