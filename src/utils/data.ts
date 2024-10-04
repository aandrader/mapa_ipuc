import { updateTempleDataType, fetchTempleIdType } from "@/actions/queries";

export function getUpdateDataDefer(newData: updateTempleDataType, originalData: fetchTempleIdType) {
  const updates = {} as any;

  // Compare originalData with existingRecord to determine changes
  for (const prop in newData) {
    const key = prop as keyof updateTempleDataType;
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
