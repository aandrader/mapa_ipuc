import { templeDataType } from "@/data/templeTypes";
import Link from "next/link";
import { CloseIcon, FacebookIcon, MapsIcon, WebIcon, YoutubeIcon } from "@/components/Icons";
import Image from "next/image";
import { IconButton } from "../../../../components/IconButton";
import { ClientButtons } from "./ClientButtons";
import { format12Hour } from "../../../../utils/utils";

export const Modal = ({ templeData }: { templeData: any }) => {
  const schedule = templeData.horarios;
  const anchors = (
    <div className="flex flex-col gap-1 items-center justify-center">
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
      <div className="overflow-auto  lg:w-fit h-fit box-content max-h-[95vh] ">
        <Link className="absolute right-0 translate-y-[25%] translate-x-[-25%]" href={"/"}>
          <CloseIcon />
        </Link>
        <Image
          src={"/logo_ipuc.webp"}
          width={300}
          height={211}
          style={{ width: "100%", height: "auto" }}
          alt="Foto iglesia"
        />
        <h1 className="text-2xl text-center font-medium break-words p-2">{templeData.congregacion}</h1>
        <div className="border-t border-solid border-gray-300 px-4 py-3 grid grid-cols-[2fr_1fr] ">
          {schedules}
          {anchors}
        </div>
        <ClientButtons temple={templeData} />
        <div className="grid place-items-center p-3 border-t border-solid border-gray-300 sticky bottom-0 bg-white">
          <IconButton
            className="w-[100%] font-medium bg-gradient-to-r from-blue-ipuc-700 to-blue-500  "
            href={"https://www.google.com/maps/place/" + templeData.coordenadas.join(",")}
          >
            <MapsIcon /> Ir al templo
          </IconButton>
        </div>
      </div>
    </div>
  );
};
