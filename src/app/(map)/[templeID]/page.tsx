import { Modal } from "@/app/(map)/[templeID]/ui/Modal";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchTempleId } from "@/actions/queries";

interface TemplePageProps {
  params: { templeID: string };
}

export async function generateMetadata({ params }: TemplePageProps): Promise<Metadata> {
  const templeData = await fetchTempleId(params.templeID);
  return {
    title: "Iglesia " + templeData.congregacion,
    description: `Ruta para ir a la congregación de ${templeData.congregacion} ubicada en ${templeData.municipio} de la Iglesia Pentecostal Unida de Colombia. Información sobre redes sociales, Facebook, Youtube, página Web y horarios de culto. Rutas a templos cercanos.`,
  };
}

export default async function TemplePage({ params }: TemplePageProps) {
  const templeData = await fetchTempleId(params.templeID);

  if (!templeData) redirect("/");

  return <Modal templeData={templeData} />;
}
