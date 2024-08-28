"use client";
import { addNewTemple } from "@/actions/queries";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatTempleId, generateRandomPassword } from "@/utils/utils";
import { useState } from "react";
import { TableSearchInput } from "./TableSearchInput";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DistrictOptions } from "./DistrictOptions";
import { toast } from "@/components/ui/use-toast";

export const DistrictTable = ({ temples, userId }: any) => {
  const [filteredTemples, setFilteredTemples] = useState(temples);
  const [newTemple, setNewTemple] = useState({ congregacion: "", municipio: "" });
  const [showTemple, setShowTemple] = useState(false);
  const router = useRouter();

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setNewTemple({
      ...newTemple,
      [name]: value,
    });
  };

  const onClick = async () => {
    const congregacion = newTemple.congregacion.trim();
    const municipio = newTemple.municipio.trim();
    if (congregacion && municipio) {
      try {
        const addedTemple = await addNewTemple({
          id: formatTempleId(congregacion, municipio),
          distrito: userId,
          password: generateRandomPassword(),
          congregacion: congregacion.trim(),
          municipio: municipio.trim(),
        });
        setFilteredTemples([addedTemple, ...filteredTemples]);
        router.refresh();
        setShowTemple(false);
        setNewTemple({ congregacion: "", municipio: "" });
        toast({
          title: `Templo ${congregacion} - ${municipio} creado correctamente.`,
          variant: "success",
        });
      } catch {
        toast({
          title: "Error",
          variant: "destructive",
          description: `No se pudo crear el nuevo templo ${congregacion} - ${municipio}. Busca si ya esta creado en la base de datos.`,
        });
      }
    }
  };

  const newTempleRow = (
    <TableRow>
      <TableCell>
        <input
          className="bg-slate-200 rounded-lg py-1 px-2"
          autoFocus
          type="text"
          name="congregacion"
          onChange={onChange}
          value={newTemple.congregacion}
        />
      </TableCell>
      <TableCell>
        <input
          className="bg-slate-200 rounded-lg py-1 px-2"
          type="text"
          name="municipio"
          onChange={onChange}
          value={newTemple.municipio}
        />
      </TableCell>
      <TableCell>Contraseña automatica</TableCell>
    </TableRow>
  );

  const buttons = showTemple ? (
    <div className="flex gap-2 ">
      <Button onClick={onClick}>Guardar nuevo templo</Button>
      <Button onClick={() => setShowTemple(false)}>Cancelar</Button>
    </div>
  ) : (
    <Button onClick={() => setShowTemple(true)}>Crear nuevo templo</Button>
  );

  return (
    <div className="p-3">
      <div className="grid grid-rows-2 md:flex md:justify-between gap-2">
        <TableSearchInput setFilteredTemples={setFilteredTemples} templesArray={temples} />
        <div className="flex gap-2 justify-between">
          {buttons}
          <DistrictOptions district={userId} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[33%]">Nombre</TableHead>
            <TableHead className="w-[33%]">Municipio</TableHead>
            <TableHead className="w-[33%]">Contraseña</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showTemple && newTempleRow}
          {filteredTemples.map((temple: any) => (
            <Row temple={temple} key={temple.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Row = ({ temple }: any) => {
  const togglePassword = (e: any) => {
    const input = e.target;
    const type = input.type;
    if (type == "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };
  return (
    <TableRow>
      <TableCell>{temple.congregacion}</TableCell>
      <TableCell>{temple.municipio}</TableCell>
      <TableCell>
        <input
          className="bg-slate-100 cursor-pointer py-1 px-2"
          type="password"
          onClick={togglePassword}
          value={temple.password}
          readOnly
        />
      </TableCell>
    </TableRow>
  );
};
