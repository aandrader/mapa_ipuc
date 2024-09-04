import Link from "next/link";
import { FacebookIcon, MapsIcon, WebIcon, YoutubeIcon } from "@/components/Icons";
import Image from "next/image";
import { IconButton } from "../../../../components/IconButton";
import { ClientButtons } from "./ClientButtons";
import { Instagram, X } from "lucide-react";
import { format12Hour, getImgUrl } from "@/utils/utils";
import { DropdownMapApps } from "./DropdownMapApps";

export const Modal = ({ templeData }: { templeData: any }) => {
  const schedule = templeData.horarios;
  const imgUrl = getImgUrl(templeData.imagen && templeData.id);
  const anchors = (
    <div className="grid grid-cols-1 gap-1 place-items-center">
      {templeData.facebook && (
        <IconButton className="bg-blue-600 hover:bg-blue-700" href={templeData.facebook}>
          <FacebookIcon />
        </IconButton>
      )}
      {templeData.youtube && (
        <IconButton className="bg-red-600 hover:bg-red-700" href={templeData.youtube}>
          <YoutubeIcon />
        </IconButton>
      )}
      {templeData.instagram && (
        <IconButton
          className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
          href={templeData.instagram}
        >
          <Instagram className="size-5" />
        </IconButton>
      )}
      {templeData.pagina && (
        <IconButton className="bg-gray-400 hover:bg-gray-500" href={templeData.pagina}>
          <WebIcon />
        </IconButton>
      )}
    </div>
  );
  const schedules = (
    <div className="flex justify-center items-start flex-col">
      {schedule.map((service: any) => (
        <li className="font-medium " key={service.dia}>
          <b>{service.dia}</b>: {format12Hour(service.hora)}
        </li>
      ))}
    </div>
  );
  return (
    <div className="absolute card absolute-center-y left-5 w-[300px] z-[1000] overflow-hidden">
      <div className="overflow-auto lg:w-fit h-fit box-content max-h-[95vh] ">
        <Link className="absolute right-0 translate-y-[25%] translate-x-[-25%] z-10" href={"/"}>
          <X size={36} className="text-white rounded-full p-1 bg-black/30" />
        </Link>
        <div className="relative w-full h-[230px] ">
          <Image
            src={imgUrl}
            className="object-cover"
            fill
            sizes="300px"
            style={{ objectFit: "cover" }}
            alt="Foto iglesia"
            priority={true}
          />
        </div>
        <h1 className="text-2xl text-center font-medium break-words p-2">{templeData.congregacion}</h1>
        <div className="border-t border-solid border-gray-300 px-4 py-3 grid grid-cols-[2fr_1fr] ">
          {schedules}
          {anchors}
        </div>
        <ClientButtons temple={templeData} />
        <div className="grid place-items-center p-3 border-t border-solid border-gray-300 sticky bottom-0 bg-white">
          <DropdownMapApps coordenadas={templeData.coordenadas} />
        </div>
      </div>
    </div>
  );
};
