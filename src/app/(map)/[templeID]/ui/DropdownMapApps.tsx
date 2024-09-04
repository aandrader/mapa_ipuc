"use client";
import { IconButton } from "@/components/IconButton";
import { IconGoogleMaps, IconWaze, MapsIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DropdownMapApps = ({ coordenadas }: any) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <IconButton className="w-full font-medium bg-gradient-to-r from-blue-ipuc-700 to-blue-500">
          <MapsIcon /> Ir al templo
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1005]" side="top" align="center">
        <DropdownMenuItem>
          <div className="relative">
            <IconButton
              className="font-medium bg-green-900 hover:bg-green-900/90  cursor-pointer "
              href={"https://www.google.com/maps/place/" + coordenadas.join(",")}
            >
              <IconGoogleMaps /> Abrir Google Maps
            </IconButton>
            {isPopoverOpen && <AddressPopover />}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconButton
            className="w-[100%] font-medium text-bla bg-[#33ccff] hover:bg-[#33ccff]/80 cursor-pointer "
            href={"https://www.waze.com/live-map/directions?to=" + coordenadas.join(",")}
          >
            <IconWaze /> Abrir Waze
          </IconButton>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsPopoverOpen(!isPopoverOpen);
            }}
            className="bg-slate-600 hover:bg-slate-600/80 w-full"
          >
            Obtener la dirección
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AddressPopover = () => {
  return (
    <div className="z-50 min-w-[8rem] absolute top-0 translate-y-[-110%] overflow-hidden rounded-md border border-slate-200 bg-white p-2 text-slate-950 shadow-md ">
      La dirección del templo se encuentra abriendo Google Maps, debajo de el botón de Indicaciones o las
      fotos del lugar.
    </div>
  );
};
