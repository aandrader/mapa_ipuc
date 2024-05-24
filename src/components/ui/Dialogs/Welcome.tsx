"use client";
import React, { useState } from "react";
import { CloseIcon } from "../Icons";
import Image from "next/image";
import { useBackdrop } from "@/hooks/useBackdrop";
import { publish } from "@/utils/events";

export const Welcome = () => {
  const [isOpen, setIsOpen] = useState(true);
  const welcomeRef = useBackdrop(setIsOpen);
  const openDialog = () => {
    publish("openDialog");
  };
  return (
    <div
      ref={welcomeRef}
      className={`${
        isOpen ? "" : "hidden"
      } absolute bottom-[100px] max-[500px]:absolute-center-x max-[500px]:w-[90%] right-4 w-[450px] text-blue-ipuc-100 bg-blue-ipuc-600 above-map card p-4`}
    >
      <div className="flex justify-between mb-1">
        <h3 className="text-xl font-normal">¡Bienvenido a Mapa Ipuc!</h3>
        <CloseIcon onClick={() => setIsOpen(false)} className="" />
      </div>
      <p>
        Un mapa interactivo con las congregaciones de la
        <a href="https://ipuc.org.co/"> Iglesia Pentecostal Unida de Colombia </a> ubicadas en el valle de
        Aburrá.
      </p>
      <p>
        Click en una iglesia
        <Image className="inline mx-2" src={"/ChurchMarker.svg"} height={25} width={25} alt="Icono Iglesia" />
        para ver su información.
      </p>
      <p>
        Tu ubicación actual se marcará con un
        <Image
          className="inline mx-2"
          src={"/LocationMarker.svg"}
          height={20}
          width={20}
          alt="Icono Iglesia"
        />
      </p>
      <p onClick={openDialog}>Software mantenido por Samuel Andrade </p>
    </div>
  );
};
