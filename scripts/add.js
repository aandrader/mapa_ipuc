import pg from "pg";
import templesData from "./congregaciones.json" assert { type: "json" };

const { Pool } = pg;

const pool = new Pool({
  connectionString: "",
  max: 20,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});

// for (const [templeID, data] of Object.entries(templesData)) {
//   const query = `INSERT INTO temples (id, congregacion, distrito, municipio, coordenadas, facebook, youtube, pagina) VALUES ('${templeID}','${data.congregacion}','${data.distrito}','${data.municipio}','{${data.coordenadas[0]},${data.coordenadas[1]}}','${data.facebook}','${data.youtube}','${data.pagina}');`;
//   //   console.log(query);
//   pool.query(query);
// }

function generarStringNumerosRandom() {
  let numeros = "";
  for (let i = 0; i < 6; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 10); // Números entre 0 y 9
    numeros += numeroAleatorio;
  }
  return numeros;
}

for (const [templeID, data] of Object.entries(templesData)) {
  const query = `UPDATE temples SET password='${generarStringNumerosRandom()}' WHERE id='${templeID}'`;
  //   console.log(query);
  pool.query(query);
}
