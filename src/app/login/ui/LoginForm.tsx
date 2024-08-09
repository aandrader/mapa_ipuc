"use client";

import { authenticate } from "@/actions/auth";
import { fetchTemplesByDistrict } from "@/actions/queries";
import { divIcon } from "leaflet";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export const LoginForm = ({ users, temples, initialTemple, initialDistrict }: any) => {
  const [templesState, setTemples] = useState(temples);
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "success") {
      // redireccionar
      // router.replace('/');
      window.location.replace(`/admin`);
    }
  }, [state]);

  const onChange = async (e: any) => {
    e.preventDefault();
    setTemples(await fetchTemplesByDistrict(e.target.value));
  };
  return (
    <form className="flex flex-col gap-2" action={dispatch}>
      <h1 className="text-center font-medium text-2xl text-white mb-2">Panel administrativo Mapa Ipuc</h1>
      <select
        className="rounded-lg px-2"
        onChange={onChange}
        defaultValue={initialDistrict ?? "default"}
        name="district"
      >
        <option disabled value={"default"}>
          Seleccionar distrito
        </option>
        {users.map((user: any) => (
          <option key={user.distrito} value={user.distrito}>
            Distrito {user.distrito}
          </option>
        ))}
      </select>
      <select className="rounded-lg px-2" defaultValue={initialTemple ?? "default"} name="user">
        <option disabled value={"default"}>
          Seleccionar templo
        </option>
        <option value="admin">Admin</option>
        {templesState.map((temple: any) => (
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
      ></input>
      <SubmitButton />
      {state === "wrongCredentials" && <div className="text-white">Contraseña incorrecta</div>}
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="rounded-lg bg-white text-blue-ipuc-800 font-medium disabled:bg-slate-400"
      disabled={pending}
    >
      Iniciar sesión
    </button>
  );
};
