"use client";

import { logout } from "@/actions/auth";
import { MapsIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { publish } from "@/utils/events";
import Link from "next/link";

export const Header = ({ title }: { title: string }) => {
  return (
    <header className="w-full bg-blue-ipuc-800 flex p-3 gap-2 text-white justify-between items-center sticky top-0 z-50 text-sm">
      <Link
        href={"/"}
        className="rounded-2xl flex font-medium bg-blue-700  text-white  text-nowrap w-fit gap-2 py-2 px-3 text-xl   "
      >
        <h1 className="hidden md:block">Mapa Ipuc</h1>
        <MapsIcon className="size-[28px]" />
      </Link>
      <h1 className="hidden md:block text-xl font-medium">{title}</h1>
      <div className="flex gap-2">
        <Button
          className="bg-blue-ipuc-600 hover:bg-blue-ipuc-600/50"
          size="sm"
          type="button"
          onClick={() => publish("openPasswordDialog")}
        >
          Cambiar contraseña
        </Button>

        <Button className=" bg-blue-ipuc-600 hover:bg-blue-ipuc-600/50" size="sm" onClick={() => logout()}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};
