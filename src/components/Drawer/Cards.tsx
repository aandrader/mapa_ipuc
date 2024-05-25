import { useMap } from "@/context/MapContext";
import { templeDataType } from "@/data/templeTypes";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { InfoAlert } from "./InfoAlert";
import Link from "next/link";

interface CardsProps {
  filteredTemples: [string, templeDataType][] | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Cards = ({ filteredTemples, setIsOpen }: CardsProps) => {
  const map = useMap();
  return (
    <div className=" overflow-y-scroll h-[calc(100%-(43px+16px))] px-4 pt-4 mt-[1px] ">
      <InfoAlert />
      <div className="grid gap-2 auto-rows-min grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mt-4 ">
        {filteredTemples?.map(([templeID, temple]) => (
          <Link href={"/" + templeID} key={temple.congregacion + temple.municipio + temple.distrito}>
            <Card
              onClick={() => {
                // if (window.innerWidth <= 640)
                setIsOpen((isOpen: boolean) => !isOpen);
                map.flyTo(temple.coordenadas, 16, { duration: 1.5 });
              }}
              congregacion={temple.congregacion}
              municipio={temple.municipio}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

interface CardProps {
  onClick: () => void;
  congregacion: string;
  municipio: string;
}

const Card = ({ congregacion, municipio, onClick }: CardProps) => {
  return (
    <div
      className="  border border-solid break-words rounded-2xl border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={"/logo_ipuc.webp"}
        width={150}
        height={105.5}
        style={{ width: "100%", height: "auto" }}
        alt="Foto iglesia"
      />
      <div className="px-1 py-3">
        <h2 className="text-center font-medium">{congregacion}</h2>
        <h3 className="text-center text-sm  text-gray-500">{municipio}</h3>
      </div>
    </div>
  );
};
