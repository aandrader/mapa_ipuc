import { pool } from "./db";

export async function GET() {
  const res = await pool.query("SELECT id,congregacion,municipio,coordenadas from temples ");
  // writeFileSync("./output.json", JSON.stringify(temples));
  return Response.json(res.rows);
}
