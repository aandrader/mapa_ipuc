import { templeDataType } from "@/data/templeTypes";
import { getSortedTemples, getTemples } from "@/utils/maps";
import { filterTemples, removeAccents } from "@/utils/utils";
import { Dispatch, SetStateAction, useRef } from "react";

interface SearchInputProps {
  templesArray: [string, templeDataType][] | undefined;
  setFilteredTemples: Dispatch<SetStateAction<[string, templeDataType][]>>;
}

export const SearchInput = ({ templesArray, setFilteredTemples }: SearchInputProps) => {
  const filterTempleArray = (value: string) => {
    const search = removeAccents(value.toLowerCase());
    if (!templesArray) return;
    const filteredArray = filterTemples(templesArray, search);
    setFilteredTemples(filteredArray);
  };
  return (
    <input
      className=" w-[100%] px-4 rounded-md border border-solid border-gray-300  focus:outline focus:outline-blue-ipuc-700"
      onChange={(e) => {
        filterTempleArray(e.target.value);
      }}
      placeholder="Buscar congregaciones..."
    />
  );
};
