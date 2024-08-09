"use client";
import { useState } from "react";
import { useBackdrop } from "@/hooks/useBackdrop";
import { Cards } from "./Cards";

import { useSortedTemples } from "@/hooks/useSortedTemples";
import { BackIcon } from "@/components/Icons";
import { Welcome } from "@/app/(map)/ui/Welcome";
import { SearchInput } from "./SearchInput";

export const Drawer = ({ temples }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useBackdrop(setIsOpen);
  const sortedTemples = useSortedTemples(temples);
  const [filteredTemples, setFilteredTemples] = useState(sortedTemples);

  const inputIcon = isOpen ? (
    <BackIcon
      className="absolute left-[calc((50px-32px)/2)] top-[calc((43px-32px)/2)] "
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    />
  ) : (
    <Welcome />
  );

  return (
    <div
      ref={drawerRef}
      className={`${
        !isOpen ? "invisible" : ""
      } absolute absolute-center card h-[95%] w-[90%] sm:right-4 sm:translate-x-0 sm:w-[45%] md:w-[55%] lg:w-[60%] above-map `}
    >
      <header className="flex gap-4 justify-between visible relative">
        <SearchInput
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          templesArray={sortedTemples}
          setFilteredTemples={setFilteredTemples}
        />
        {inputIcon}
      </header>
      <Cards filteredTemples={filteredTemples} setIsOpen={setIsOpen} />
    </div>
  );
};
