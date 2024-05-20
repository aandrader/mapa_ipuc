"use client";
import { useEffect, useMemo, useState } from "react";
import { CloseIcon, SearchIcon } from "../Icons";
import { useMapContext } from "../../../context/MapContext";
import { getSortedTemples } from "@/utils/maps";
import { SearchInput } from "./SearchInput";
import { Cards } from "./Cards";
import { templeDataType } from "@/data/templeTypes";

export const Drawer = () => {
  const { map, userLocation } = useMapContext();
  const [sortedTemples, setSortedTemples] = useState<[string, templeDataType][]>([]);
  const [filteredTemples, setFilteredTemples] = useState<[string, templeDataType][]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(filteredTemples);

  useEffect(() => {
    const res = getSortedTemples(map, userLocation);
    setSortedTemples(res);
    setFilteredTemples(res);
  }, [userLocation, map]);

  const modal = (
    <div
      className={`${
        !isOpen ? "hidden" : ""
      } absolute right-1/2 top-1/2 translate-x-[50%] translate-y-[-50%] h-[95%] w-[90%] sm:right-4 sm:translate-x-0 sm:w-[45%] md:w-[55%] lg:w-[60%]  bg-white rounded-2xl border border-solid z-[1003] border-gray-300`}
    >
      <header className="flex gap-4 justify-between p-4">
        <SearchInput templesArray={sortedTemples} setFilteredTemples={setFilteredTemples} />
        <CloseIcon className="justify-self-end" onClick={() => setIsOpen(!isOpen)} />
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
