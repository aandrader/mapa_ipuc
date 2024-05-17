"use client";
import { useMemo, useState } from "react";
import { CloseIcon, SearchIcon } from "../Icons";
import { useMapContext } from "../../../context/MapContext";
import { getSortedTemples } from "@/utils/maps";
import { SearchInput } from "./SearchInput";
import { Cards } from "./Cards";

export const Drawer = () => {
  const { map, userLocation } = useMapContext();
  const templesArray = useMemo(() => getSortedTemples(map, userLocation), [userLocation, map]);
  const [filteredTemples, setFilteredTemples] = useState(templesArray);
  const [isOpen, setIsOpen] = useState(false);

  const modal = (
    <div
      className={`${
        !isOpen ? "hidden" : ""
      } absolute right-1/2 top-1/2 translate-x-[50%] translate-y-[-50%] h-[95%] w-[90%] sm:right-4 sm:translate-x-0 sm:w-[45%] md:w-[55%] lg:w-[60%]  bg-white rounded-2xl border border-solid z-[1003] border-gray-300`}
    >
      <header className="flex gap-4 p-4">
        <SearchInput templesArray={templesArray} setFilteredTemples={setFilteredTemples} />
        <CloseIcon onClick={() => setIsOpen(!isOpen)} />
      </header>
      <Cards filteredTemples={filteredTemples} setIsOpen={setIsOpen} />
    </div>
  );

  return (
    <>
      <div className="absolute right-3 sm:right-10 top-1/2  translate-y-[-50%] z-[1001] ">
        <SearchIcon onClick={() => setIsOpen(!isOpen)} />
      </div>
      {modal}
    </>
  );
};
