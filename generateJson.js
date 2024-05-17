import templesData from "./src/data/congregaciones.json" assert { type: "json" };
import { writeFileSync } from "fs";

const tildes = {
  á: "a",
  é: "e",
  í: "i",
  ó: "o",
  ú: "u",
  ü: "u",
  ñ: "n",
};

const format = (str) => {
  const words = str.split(" ");
  const lowercased = words.map((word) => word.toLowerCase());
  const dashed = lowercased.join("-");
  return dashed.replace(/[áéíóúüñ]/g, (match) => tildes[match] || match);
};

const newJson = {};

for (const { id, ...temple } of Object.values(templesData)) {
  newJson[format(temple.congregacion) + "-" + format(temple.municipio)] = { ...temple };
}

writeFileSync("./congregaciones.json", JSON.stringify(newJson));
// trim to delete end/start spaces

console.log(templesData);
