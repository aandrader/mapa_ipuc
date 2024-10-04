"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/auth";
import { MapsIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { publish } from "@/utils";
import Link from "next/link";
import { AlignJustify, KeyRound, LogOut } from "lucide-react";

export const Header = ({ title }: { title: string }) => {
  const logo = (
    <Link
      href={"/"}
      className="rounded-2xl flex font-medium bg-blue-700  text-white  text-nowrap w-fit gap-2 py-2 px-3 text-xl   "
    >
      <h1 className="hidden md:block">Mapa Ipuc</h1>
      <MapsIcon className="size-[28px]" />
    </Link>
  );

  const buttons = (
    <div className="hidden md:flex gap-2">
      <Button
        className="bg-blue-ipuc-600 hover:bg-blue-ipuc-600/50 flex gap-2"
        size="sm"
        type="button"
        onClick={() => publish("openPasswordDialog")}
      >
        <KeyRound />
        Cambiar contraseña
      </Button>

      <Button
        className=" bg-blue-ipuc-600 hover:bg-blue-ipuc-600/50 flex gap-2"
        size="sm"
        onClick={() => logout()}
      >
        <LogOut />
        Cerrar sesión
      </Button>
    </div>
  );

  const dropdown = (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignJustify />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[1005]">
          <DropdownMenuItem
            className=" cursor-pointer flex gap-2"
            onClick={() => publish("openPasswordDialog")}
          >
            <KeyRound />
            Cambiar contraseña
          </DropdownMenuItem>
          <DropdownMenuItem className=" cursor-pointer flex gap-2" onClick={() => logout()}>
            <LogOut />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <header className="w-full bg-blue-ipuc-800 flex p-3 gap-2 text-white justify-between items-center sticky top-0 text-sm above-map">
      {logo}
      <h1 className="md:text-xl font-medium">{title}</h1>
      {buttons}
      {dropdown}
    </header>
  );
};
