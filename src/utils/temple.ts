import { fetchTemplesByDistrictAdminType, fetchTemplesType } from "@/actions/queries";

export const removeAccents = (string: string) => {
  const tildes = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ü: "u",
    ñ: "n",
  };

  return string.replace(/[áéíóúüñ]/gi, (match) => tildes[match as keyof typeof tildes]);
};

export function filterTemples<T extends fetchTemplesByDistrictAdminType | fetchTemplesType>(
  temples: T,
  search: string
) {
  return temples.filter(({ congregacion, municipio }) => {
    const templeName = removeAccents(congregacion.toLowerCase());
    const templeRegion = removeAccents(municipio.toLowerCase());
    return templeName === "" ? templeName : templeName.includes(search) || templeRegion.includes(search);
  }) as T;
}

export const formatTempleId = (temple: string, town: string) => {
  const newTemple = removeAccents(temple.toLowerCase().trim().replace(/\s+/g, "-"));
  const newTown = removeAccents(town.toLowerCase().trim().replace(/\s+/g, "-"));
  return newTemple + "-" + newTown;
};
