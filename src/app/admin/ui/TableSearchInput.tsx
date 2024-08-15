import { filterTemples, removeAccents } from "@/utils/utils";

export const TableSearchInput = ({ templesArray, setFilteredTemples }: any) => {
  const filterTempleArray = (value: string) => {
    const search = removeAccents(value.toLowerCase());
    if (!templesArray) return;
    const filteredArray = filterTemples(templesArray, search);
    setFilteredTemples(filteredArray);
  };
  return (
    <input
      className={`size-[30%] px-3 py-2 rounded-md border border-solid border-gray-300 outline-none focus:border-blue-ipuc-700  `}
      onChange={(e) => {
        filterTempleArray(e.target.value);
      }}
      placeholder="Buscar congregaciones..."
    />
  );
};
