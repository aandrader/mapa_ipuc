import { fetchTemplesByDistrictAdminType } from "@/actions/queries";
import { filterTemples, removeAccents } from "@/utils";
import { Dispatch, SetStateAction } from "react";

interface Props {
  temples: fetchTemplesByDistrictAdminType;
  setFilteredTemples: Dispatch<SetStateAction<fetchTemplesByDistrictAdminType>>;
}

export const TableSearchInput = ({ temples, setFilteredTemples }: Props) => {
  const filterTempleArray = (value: string) => {
    const search = removeAccents(value.toLowerCase());
    if (!temples) return;
    const filteredArray = filterTemples(temples, search);
    setFilteredTemples(filteredArray);
  };
  return (
    <input
      className={`w-full px-3 py-2 rounded-md border border-solid border-gray-300 outline-none focus:border-blue-ipuc-700  `}
      onChange={(e) => {
        filterTempleArray(e.target.value);
      }}
      placeholder="Buscar congregaciones..."
    />
  );
};
