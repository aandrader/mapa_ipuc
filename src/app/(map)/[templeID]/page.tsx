import { Modal } from "@/components/ui/Modal";
import { type templeIdType } from "@/data/templeTypes";
import { getTemples } from "@/utils/maps";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const templesData = getTemples();
  return Object.keys(templesData);
}

interface TemplePageProps {
  params: { templeID: templeIdType };
}

export async function generateMetadata({ params }: TemplePageProps): Promise<Metadata> {
  const templesData = getTemples();
  const templeData = templesData[params.templeID];
  return {
    title: "iglesia " + templeData.congregacion,
    description: `Ruta para ir a la congregación de ${templeData.congregacion} ubicado en ${templeData.municipio} de la Iglesia Pentecostal Unida de Colombia. Información sobre redes sociales, Facebook, Youtube, página Web y horarios de culto. Rutas a templos cercanos.`,
  };
}

export default function NamePage({ params }: TemplePageProps) {
  const templesData = getTemples();
  const templeData = templesData[params.templeID];
  if (!templeData) redirect("/");

  return <Modal templeData={templeData} />;
}
