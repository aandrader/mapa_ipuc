import { MetadataRoute } from "next";
import { fetchAllId } from "../actions/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const templesData = await fetchAllId();
  return templesData.map(({ id }) => ({ url: `https://mapaipuc.info/${id}`, changeFrequency: "monthly" }));
}
