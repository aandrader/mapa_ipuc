"use server";

import { cache } from "react";
import { pool } from "./db";

export const fetchTempleId = cache(async (templeId: string) => {
  const res = await pool.query(`SELECT * from temples WHERE id='${templeId}'`);
  return res.rows[0];
});

export const fetchAllId = async () => {
  const res = await pool.query(`SELECT id from temples`);
  return res.rows;
};
