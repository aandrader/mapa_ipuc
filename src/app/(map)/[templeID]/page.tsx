import { getTemples } from "@/utils/db";
import { Modal } from "@/components/Modal/Modal";
import { type templeIdType } from "@/data/templeTypes";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchTemples } from "@/app/db/db";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const templesData = await fetchTemples();
  return Object.keys(templesData);
}

interface TemplePageProps {
  params: { templeID: templeIdType };
}

export async function generateMetadata({ params }: TemplePageProps): Promise<Metadata> {
  const templesData = await fetchTemples();
  const templeData = templesData[params.templeID];
  return {
    title: "Iglesia " + templeData.congregacion,
    description: `Ruta para ir a la congregación de ${templeData.congregacion} ubicada en ${templeData.municipio} de la Iglesia Pentecostal Unida de Colombia. Información sobre redes sociales, Facebook, Youtube, página Web y horarios de culto. Rutas a templos cercanos.`,
  };
}

export default async function TemplePage({ params }: TemplePageProps) {
  const templesData = await fetchTemples();

  const templeData = templesData[params.templeID];
  if (!templeData) redirect("/");

  return <Modal templeData={templeData} />;
}
