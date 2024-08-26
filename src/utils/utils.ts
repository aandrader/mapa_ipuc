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

export const filterTemples = (array: any, search: string) => {
  return array.filter(({ congregacion, municipio }: any) => {
    const templeName = removeAccents(congregacion.toLowerCase());
    const templeRegion = removeAccents(municipio.toLowerCase());
    return templeName === "" ? templeName : templeName.includes(search) || templeRegion.includes(search);
  });
};

export const formatTempleId = (temple: string, town: string) => {
  const newTemple = removeAccents(temple.toLowerCase().trim().replace(/\s+/g, "-"));
  const newTown = removeAccents(town.toLowerCase().trim().replace(/\s+/g, "-"));
  return newTemple + "-" + newTown;
};

export function generateRandomPassword() {
  let numeros = "";
  for (let i = 0; i < 6; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 10); // Números entre 0 y 9
    numeros += numeroAleatorio;
  }
  return numeros;
}

export function format12Hour(time: string) {
  // Split the time into hours and minutes
  const [hours, minutes] = time.split(":");

  // Convert hours to an integer
  const hoursInt = parseInt(hours, 10);

  // Determine AM or PM
  const period = hoursInt >= 12 ? "PM" : "AM";

  // Return formatted time
  return `${hoursInt % 12 || 12}:${minutes}${period}`;
}

export function getUpdateDataDefer(newData: any, originalData: any) {
  const updates = {} as any;

  // Compare originalData with existingRecord to determine changes
  for (let key in newData) {
    if (["coordenadas", "horarios"].includes(key)) {
      if (JSON.stringify(originalData[key]) !== JSON.stringify(newData[key])) {
        updates[key] = newData[key];
      }
    } else if (originalData[key] !== newData[key]) {
      updates[key] = newData[key];
    }
  }
  return updates;
}

export function getImgUrl(templeId: string) {
  return templeId
    ? "https://" + process.env.NEXT_PUBLIC_CLOUDFRONT_URL + "/" + templeId + ".webp"
    : "/logo_ipuc.webp";
}
