import { LatLngTuple } from "leaflet";

export type templeIdType = any;

export interface templeDataType {
  congregacion: string;
  distrito: number;
  municipio: string;
  coordenadas: LatLngTuple;
  facebook: string;
  youtube: string;
  pagina: string;
  horarios?: any;
}
