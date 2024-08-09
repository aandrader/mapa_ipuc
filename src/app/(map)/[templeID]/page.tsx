import { Modal } from "@/app/(map)/[templeID]/ui/Modal";
import { type templeIdType } from "@/data/templeTypes";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchTempleId } from "@/actions/queries";

export const dynamic = "force-static";
interface TemplePageProps {
  params: { templeID: templeIdType };
}

export async function generateMetadata({ params }: TemplePageProps): Promise<Metadata> {
  const templeData = (await fetchTempleId(params.templeID)) as any;
  return {
    title: "Iglesia " + templeData.congregacion,
    description: `Ruta para ir a la congregación de ${templeData.congregacion} ubicada en ${templeData.municipio} de la Iglesia Pentecostal Unida de Colombia. Información sobre redes sociales, Facebook, Youtube, página Web y horarios de culto. Rutas a templos cercanos.`,
  };
}

export default async function TemplePage({ params }: TemplePageProps) {
  const templeData = (await fetchTempleId(params.templeID)) as any;

  if (!templeData) redirect("/");

  return <Modal templeData={templeData} />;
}
