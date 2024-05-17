import { getTemples } from "@/utils/maps";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const templesData = getTemples();
  return Object.keys(templesData).map((id) => ({ url: `https://mapaipuc.vercel.app/${id}` }));
}
