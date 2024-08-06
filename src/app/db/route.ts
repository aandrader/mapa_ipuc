import { fetchTemples } from "./db";

export async function GET() {
  const temples = await fetchTemples();
  // writeFileSync("./output.json", JSON.stringify(temples));
  return Response.json(temples);
}
