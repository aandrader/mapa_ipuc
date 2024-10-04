"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { fetchTemplesByDistrict, fetchTemplesByDistrictType, fetchUsersType } from "@/actions/queries";
import { authenticate } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Props {
  users: fetchUsersType;
  temples: fetchTemplesByDistrictType | [];
  initialTemple: string;
  initialDistrict: string;
}

export const LoginForm = ({ users, temples, initialTemple, initialDistrict }: Props) => {
  const [templesState, setTemples] = useState(temples);
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "success") {
      window.location.replace(`/admin`);
      return;
    } else if (state === "wrongCredentials") {
      toast({
        title: "Contraseña incorrecta",
        variant: "error",
      });
    }
  }, [state]);

  const onChange = async (e: any) => {
    e.preventDefault();
    setTemples(await fetchTemplesByDistrict(e.target.value));
  };
  return (
    <form className="flex flex-col gap-2 " action={dispatch}>
      <h1 className="text-center font-medium text-2xl text-white mb-2">Panel administrativo Mapa Ipuc</h1>
      <select
        className="rounded-lg px-2 w-full"
        onChange={onChange}
        defaultValue={initialDistrict ?? ""}
        name="district"
        required
      >
        <option disabled value={""}>
          Seleccionar distrito
        </option>

        {users.map((user) => (
          <option key={user.distrito} value={user.distrito}>
            Distrito {user.distrito}
          </option>
        ))}
      </select>
      <select className="rounded-lg px-2 w-full" defaultValue={initialTemple ?? ""} name="user" required>
        <option disabled value={""}>
          Seleccionar templo
        </option>
        <option value="admin">Admin</option>
        {templesState.map((temple) => (
          <option key={temple.id} value={temple.id}>
            {temple.congregacion} - {temple.municipio}
          </option>
        ))}
      </select>
      <input
        className="rounded-lg px-3 py-1"
        name="password"
        placeholder="Contraseña"
        type="password"
        required
      ></input>
      <ForgetPassword />

      <SubmitButton />
    </form>
  );
};

const ForgetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <span onClick={() => setIsOpen(!isOpen)} className="text-white text-xs underline cursor-pointer">
        ¿Olvidaste tu contraseña?
      </span>
      <p className={`${isOpen ? "" : "hidden"} text-white text-xs "`}>
        Contactarse con decom distrital para reestablecerla.
      </p>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="rounded-lg bg-white hover:bg-white/80 text-blue-ipuc-800 font-medium disabled:bg-slate-400"
      disabled={pending}
    >
      Iniciar sesión
    </Button>
  );
};
