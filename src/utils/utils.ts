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
    ? "https://" + process.env.NEXT_PUBLIC_MEDIA_URL + "/" + templeId + ".webp"
    : "/logo_ipuc.webp";
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = (event.target as any).result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function resizeImage(file: File, newWidth: number) {
  const img = await loadImage(file);

  // Get original dimensions
  const originalWidth = img.width;
  const originalHeight = img.height;

  if (originalHeight > originalWidth)
    throw new Error("Foto vertical no admitida, tomar una foto horizontal de la fachada del templo.");

  const scaleFactor = newWidth / originalWidth;
  const newHeight = originalHeight * scaleFactor;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = newWidth;
  canvas.height = newHeight;

  if (!ctx) throw new Error("2D context is not supported");

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject("Error generando blob");
        return;
      }
      resolve(blob);
    }, "image/webp");
  });
}
