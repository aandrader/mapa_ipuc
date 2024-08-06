import { MetadataRoute } from "next";
import { fetchTemples } from "./db/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const templesData = await fetchTemples();
  return Object.keys(templesData).map((id) => ({ url: `https://mapaipuc.info/${id}` }));
}
