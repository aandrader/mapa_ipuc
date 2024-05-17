import { Modal } from "@/components/ui/Modal";
import { type templeIdType } from "@/data/templeTypes";
import { getTemples } from "@/utils/maps";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
    title: templeData.congregacion,
  };
}

export default function NamePage({ params }: TemplePageProps) {
  const templesData = getTemples();
  const templeData = templesData[params.templeID];
  if (!templeData) redirect("/");

  return <Modal templeData={templeData} />;
}
