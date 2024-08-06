import pg from "pg";
import templesData from "./congregaciones.json" assert { type: "json" };

const { Pool } = pg;

const pool = new Pool({
  connectionString: "",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

for (const [templeID, data] of Object.entries(templesData)) {
  const query = `INSERT INTO temples (congregacion, distrito, municipio, coordenadas, facebook, youtube, pagina) VALUES ('${data.congregacion}','${data.distrito}','${data.municipio}','{${data.coordenadas[0]},${data.coordenadas[1]}}','${data.facebook}','${data.youtube}','${data.pagina}');`;
  //   console.log(query);
  pool.query(query);
}
