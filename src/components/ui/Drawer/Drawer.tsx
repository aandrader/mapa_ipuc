"use client";
import { useEffect, useRef, useState } from "react";
import { TemplesList } from "./TemplesList";

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDrawer = (event: any) => {
      if (!drawerDiv.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDrawer);
    return () => {
      document.removeEventListener("mousedown", closeDrawer);
    };
  });

  return (
    <div
      ref={drawerDiv}
      className={`${
        !isOpen ? "invisible" : ""
      } absolute right-1/2 top-1/2 translate-x-[50%] translate-y-[-50%] h-[95%] w-[90%] sm:right-4 sm:translate-x-0 sm:w-[45%] md:w-[55%] lg:w-[60%]  bg-white rounded-2xl border border-solid z-[1003] border-gray-300`}
    >
      <TemplesList isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
