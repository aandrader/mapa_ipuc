"use client";

import { signOut } from "@/app/api/auth/auth";
import { Button } from "@/components/ui/button";
import { publish } from "@/utils/events";

export const Header = ({ title }: { title: string }) => {
  return (
    <header className="w-full bg-blue-ipuc-800 flex p-3 text-white justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-medium">{title}</h1>
      <div className="flex gap-2">
        <Button
          className="bg-blue-ipuc-600 hover:bg-blue-ipuc-600/50"
          type="button"
          onClick={() => publish("openPasswordDialog")}
        >
          Cambiar contraseña
        </Button>

        <Button className=" bg-blue-ipuc-600 hover:bg-blue-ipuc-600/50" onClick={() => signOut()}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};
