import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { InfoAlert } from "./InfoAlert";
import Link from "next/link";
import { useMap } from "@/map/MapProvider";
import { getImgUrl } from "@/utils";
import { fetchTemplesType, fetchTempleType } from "@/actions/queries";

interface CardsProps {
  filteredTemples: fetchTemplesType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Cards = ({ filteredTemples, setIsOpen }: CardsProps) => {
  const map = useMap();
  return (
    <div className=" overflow-y-scroll h-[calc(100%-(43px+16px))] px-4 pt-4 mt-[1px] ">
      <InfoAlert />
      <div className="grid gap-2 auto-rows-min grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mt-4 ">
        {filteredTemples.map((temple: fetchTempleType) => (
          <Link prefetch={false} href={"/" + temple.id} key={temple.id}>
            <Card
              onClick={() => {
                // if (window.innerWidth <= 640)
                setIsOpen((isOpen: boolean) => !isOpen);
                map.flyTo(temple.coordenadas!, 16, { duration: 1.5 });
              }}
              imgId={temple.imagen!! && temple.id}
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
  imgId: string | false;
}

const Card = ({ congregacion, municipio, imgId, onClick }: CardProps) => {
  const imgUrl = getImgUrl(imgId);
  return (
    <div
      className="border h-full border-solid break-words rounded-2xl border-gray-300 cursor-pointer overflow-hidden "
      onClick={onClick}
    >
      <div className="relative w-full h-[105.5px] ">
        <Image
          src={imgUrl}
          fill
          className="object-cover"
          sizes="(max-width: 450px) 40vw, (max-width: 640px) 30vw, (max-width: 450px) 40vw , (max-width: 1024px) 18vw , 13vw"
          alt="Foto iglesia"
        />
      </div>
      <div className="px-1 py-3">
        <h2 className="text-center font-medium">{congregacion}</h2>
        <h3 className="text-center text-sm  text-gray-500">{municipio}</h3>
      </div>
    </div>
  );
};
