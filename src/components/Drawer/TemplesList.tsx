import { Dispatch, SetStateAction } from "react";
import { SearchInput } from "./SearchInput";
import { BackIcon } from "../Icons";
import { Cards } from "./Cards";
import { useTemples } from "@/hooks/useTemples";
import { Welcome } from "../Dialogs/Welcome";

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
    <Welcome />
  );

  return (
    <>
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
    </>
  );
};
