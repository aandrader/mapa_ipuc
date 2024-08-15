"use client";
import { useBackdrop } from "@/hooks/useBackdrop";
import { subscribe, unsubscribe } from "@/utils/events";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/Icons";
import { InputLabel } from "./InputLabel";
import { toast } from "@/components/ui/use-toast";
import { changePassword } from "@/actions/queries";

export const PasswordDialog = ({ session }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useBackdrop(setIsOpen);

  useEffect(() => {
    subscribe("openPasswordDialog", () => setIsOpen(true));
    return () => {
      unsubscribe("openPasswordDialog", () => setIsOpen(true));
    };
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const { newPassword1, newPassword2, currentPassword } = data as any;

    if (newPassword1 !== newPassword2) {
      toast({
        title: "Error",
        variant: "error",
        description: "Las contraseñas no coinciden.",
      });
      return;
    }

    if (newPassword1 === currentPassword) {
      toast({
        title: "Error",
        variant: "error",
        description: "La nueva contraseña es la misma que la actual.",
      });
    }

    const { ok } = await changePassword(currentPassword, newPassword1, session);
    if (ok) {
      toast({
        title: "Contraseña cambiada correctamente",
        variant: "success",
      });
    } else {
      toast({
        title: "Error",
        variant: "error",
        description: "La contraseña actual es incorrecta.",
      });
    }
  };
  return isOpen ? (
    <div className="absolute top-0 right-0 w-screen h-screen bg-blur above-map ">
      <div ref={dialogRef} className={`absolute absolute-center text-[15px] card p-5 w-[300px] `}>
        <form onSubmit={onSubmit}>
          <div className="flex items-center">
            <h1 className="font-medium text-xl w-full leading-5 text-blue-ipuc-800">Cambiar contraseña</h1>
            <CloseIcon className="size-8" onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex flex-col gap-2">
            <InputLabel label="Contraseña actual" type="password" name="currentPassword" />
            <InputLabel label="Nueva contraseña" type="password" name="newPassword1" />
            <InputLabel label="Repetir nueva contraseña" type="password" name="newPassword2" />

            <button className="rounded-2xl bg-gradient-to-r from-blue-ipuc-700 to-blue-500 text-white gap-2 py-2 px-3 text-sm w-full ">
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};
