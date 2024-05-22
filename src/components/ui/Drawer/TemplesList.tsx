import { Dispatch, SetStateAction } from "react";
import { SearchInput } from "./SearchInput";
import { BackIcon, MapsIcon } from "../Icons";
import { Cards } from "./Cards";
import { useTemples } from "@/hooks/useTemples";

interface TemplesListProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TemplesList = ({ isOpen, setIsOpen }: TemplesListProps) => {
  const { sortedTemples, filteredTemples, setFilteredTemples } = useTemples();

  const inputIcon = isOpen ? (
    <BackIcon
      className="absolute left-[calc((50px-32px)/2)] top-[calc((43px-32px)/2)] "
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    />
  ) : (
    <div className="absolute left-[calc((50px-32px)/2)] top-[calc((42px-32px)/2)]   rounded-full bg-gradient-to-r from-blue-ipuc-700 to-blue-500 p-1    ">
      <MapsIcon className="size-[24px]" />
    </div>
  );

  return (
    <>
      <header onClick={() => setIsOpen(true)} className="flex gap-4 justify-between visible relative">
        <SearchInput isOpen={isOpen} templesArray={sortedTemples} setFilteredTemples={setFilteredTemples} />
        {inputIcon}
      </header>
      <Cards filteredTemples={filteredTemples} setIsOpen={setIsOpen} />
    </>
  );
};
