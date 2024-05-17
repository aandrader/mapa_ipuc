import { LatLngTuple } from "leaflet";
import templeData from "./congregaciones.json";

export type templeIdType = keyof typeof templeData;

export interface templeDataType {
  congregacion: string;
  distrito: number;
  municipio: string;
  coordenadas: LatLngTuple;
  facebook: string;
  youtube: string;
  pagina: string;
  horarios: never[];
}
