import { templeDataType } from "@/data/templeTypes";

export const removeAccents = (string: string) => {
  const tildes = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ü: "u",
  };

  return string.replace(/[áéíóúü]/gi, (match) => tildes[match as keyof typeof tildes]);
};

export const filterTemples = (array: [string, templeDataType][], search: string) => {
  return array.filter(([_, item]) => {
    const templeName = removeAccents(item.congregacion.toLowerCase());
    const templeRegion = removeAccents(item.municipio.toLowerCase());
    return templeName === "" ? templeName : templeName.includes(search) || templeRegion.includes(search);
  });
};

export const formatTempleUrl = (temple: string, town: string) => {
  const newTemple = removeAccents(temple.toLowerCase().trim().replace(/\s+/g, "-"));
  const newTown = removeAccents(town.toLowerCase().trim().replace(/\s+/g, "-"));
  return newTemple + "-" + newTown;
};
