import { formatTempleUrl } from "@/utils/utils";
import { unstable_cache } from "next/cache";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const fetchTemples = unstable_cache(
  async () => {
    console.log("DB");
    const res = await pool.query("SELECT * from temples ");
    const temples: any = {};

    for (const temple of res.rows) {
      temples[formatTempleUrl(temple.congregacion, temple.municipio)] = temple;
    }
    return temples;
  },
  ["db-temples"],
  {
    revalidate: 15,
  }
);
