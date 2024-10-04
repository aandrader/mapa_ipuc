import { fetchTemplesType } from "@/actions/queries";
import { filterTemples, removeAccents } from "@/utils";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  temples: fetchTemplesType;
  setFilteredTemples: Dispatch<SetStateAction<fetchTemplesType>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchInput = ({ temples, setFilteredTemples, isOpen, setIsOpen }: SearchInputProps) => {
  const filterTempleArray = (value: string) => {
    const search = removeAccents(value.toLowerCase());
    if (!temples) return;
    const filteredArray = filterTemples(temples, search);
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
