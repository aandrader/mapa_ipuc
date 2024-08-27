import { fetchTemplesByDistrictExcel } from "@/actions/queries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { utils, writeFile } from "@e965/xlsx";

export const DistrictOptions = ({ district }: { district: string }) => {
  const onExcel = async () => {
    const temples = await fetchTemplesByDistrictExcel(district);
    const worksheet = utils.json_to_sheet(temples);

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Templos");

    writeFile(workbook, `Mapa Ipuc Base de Datos Distrito ${district}.xlsx`, { compression: true });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className=" cursor-pointer" onClick={onExcel}>
          Descargar base de datos en excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
