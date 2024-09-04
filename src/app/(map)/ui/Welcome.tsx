"use client";
import { useState } from "react";
import { CloseIcon, MapsIcon, IconUserLocation, IconChurch } from "../../../components/Icons";
import { useBackdrop } from "@/hooks/useBackdrop";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { publish } from "@/utils/events";

let firstEnter = true;

export const Welcome = () => {
  const [isOpen, setIsOpen] = useState(typeof window === "undefined" || firstEnter);
  firstEnter = false;
  const welcomeRef = useBackdrop(setIsOpen);
  const router = useRouter();

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="absolute left-[calc((50px-32px)/2)] top-[calc((42px-32px)/2)] rounded-full bg-gradient-to-r from-blue-ipuc-700 to-blue-500 p-1 cursor-pointer "
      >
        <MapsIcon className="size-[24px]" />
      </div>

      <div
        ref={welcomeRef}
        className={`${
          isOpen ? "" : "hidden"
        } absolute top-[60px] w-[350px] max-w-full text-xs leading-5 text-blue-ipuc-200 bg-gradient-to-r from-blue-ipuc-700 to-blue-600 above-map tooltip-arrow rounded-xl p-4`}
      >
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-base font-medium leading-5">¡Bienvenido a Mapa Ipuc!</h3>
          <CloseIcon
            onClick={() => {
              setIsOpen(false);
            }}
            className="size-7 cursor-pointer"
          />
        </div>
        <p>
          Un mapa interactivo con las congregaciones de la{" "}
          <a className="underline text-blue-ipuc-100" href="https://ipuc.org.co/">
            Iglesia Pentecostal Unida de Colombia{" "}
          </a>
          ubicadas en el Valle de Aburrá.
        </p>
        <p>
          Seleccione el icono
          <IconChurch />
          para ver la ruta, los horarios y redes del templo.
        </p>
        <p>
          Su ubicación actual se marcará con un
          <IconUserLocation />
        </p>
        <p>¿Falta su congregación o desea modificarla? Ingresar al panel administrativo.</p>
        <div className="flex gap-3 mt-2 items-end">
          <Button onClick={() => router.push("/login")} size="xs">
            Iniciar sesión
          </Button>
          {/* <Button size="xs">Contacto</Button> */}
          <p onClick={() => publish("openDialog")} className="text-[10px] underline cursor-pointer">
            Software creado por Samuel Andrade
          </p>
        </div>
      </div>
    </>
  );
};
