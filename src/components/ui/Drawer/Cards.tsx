import { useMapContext } from "@/context/MapContext";
import { templeDataType } from "@/data/templeTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface CardsProps {
  filteredTemples: [string, templeDataType][] | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Cards = ({ filteredTemples, setIsOpen }: CardsProps) => {
  const router = useRouter();
  const { map } = useMapContext();
  return (
    <div className="grid auto-rows-min grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center  overflow-y-scroll h-[calc(100%-(68px+16px))] px-4 gap-2  ">
      {filteredTemples?.map(([templeID, temple]) => (
        <Card
          onClick={() => {
            router.push("/" + templeID);
            setIsOpen((isOpen: boolean) => !isOpen);
            map.flyTo(temple.coordenadas, 16, { duration: 1.5 });
          }}
          congregacion={temple.congregacion}
          municipio={temple.municipio}
          key={temple.congregacion + temple.municipio + temple.distrito}
        />
      ))}
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
