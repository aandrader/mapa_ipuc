import { templeDataType } from "@/data/templeTypes";
import { filterTemples, removeAccents } from "@/utils/utils";
import { Dispatch, SetStateAction, useRef } from "react";

interface SearchInputProps {
  templesArray: [string, templeDataType][] | undefined;
  setFilteredTemples: Dispatch<SetStateAction<[string, templeDataType][]>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchInput = ({ templesArray, setFilteredTemples, isOpen, setIsOpen }: SearchInputProps) => {
  const filterTempleArray = (value: string) => {
    const search = removeAccents(value.toLowerCase());
    if (!templesArray) return;
    const filteredArray = filterTemples(templesArray, search);
    setFilteredTemples(filteredArray);
  };
  return (
    <input
      onClick={() => setIsOpen(true)}
      className={`size-full pr-4 pl-[50px] py-2 rounded-md border border-solid border-gray-300 outline-none focus:border-blue-ipuc-700 ${
        isOpen ? "rounded-b-none " : ""
      } `}
      onChange={(e) => {
        filterTempleArray(e.target.value);
      }}
      placeholder="Buscar congregaciones..."
    />
  );
};
