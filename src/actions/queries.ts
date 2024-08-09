"use server";

import { cache } from "react";
import { pool } from "../db/db";

export const fetchTemples = cache(async () => {
  console.log("DB");
  const res = await pool.query("SELECT id,congregacion,municipio,coordenadas from temples ");
  return res.rows;
});

export const fetchTempleId = cache(async (templeId: string) => {
  const res = await pool.query(
    `SELECT id,congregacion,distrito,municipio,coordenadas,facebook,youtube,pagina,horarios from temples WHERE id='${templeId}'`
  );
  return res.rows[0];
});

export const fetchTemplesByDistrict = async (templeId: string) => {
  const res = await pool.query(
    `SELECT id,congregacion,distrito,municipio,coordenadas,facebook,youtube,pagina,horarios from temples WHERE distrito=${templeId}`
  );
  return res.rows;
};

export const fetchAllId = async () => {
  const res = await pool.query(`SELECT id from temples`);
  return res.rows;
};

export const fetchNameId = async () => {
  const res = await pool.query(`SELECT id,congregacion,municipio from temples`);
  return res.rows;
};

export const fetchUsers = async () => {
  const res = await pool.query(`SELECT distrito from users`);
  return res.rows;
};

export const getAuthTemple = async (templeId: string) => {
  const res = await pool.query(`SELECT id,password from temples WHERE id='${templeId}'`);
  return res.rows[0];
};

export const getAuthAdmin = async (distrito: string) => {
  const res = await pool.query(`SELECT distrito,password from users WHERE distrito=${distrito}`);
  return res.rows[0];
};
