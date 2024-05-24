"use client";
import { useEffect, useRef, useState } from "react";
import { TemplesList } from "./TemplesList";
import { useBackdrop } from "@/hooks/useBackdrop";

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useBackdrop(setIsOpen);
  return (
    <div
      ref={drawerRef}
      className={`${
        !isOpen ? "invisible" : ""
      } absolute absolute-center card h-[95%] w-[90%] sm:right-4 sm:translate-x-0 sm:w-[45%] md:w-[55%] lg:w-[60%] above-map `}
    >
      <TemplesList isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
