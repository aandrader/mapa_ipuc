"use server";

import { cache } from "react";
import { db, pool } from "../db/db";
import { revalidatePath } from "next/cache";
import { temples, users } from "@/db/schema";
import { eq, getTableColumns } from "drizzle-orm";
import { getUpdateDataDefer } from "@/utils/utils";

const { password, ...columns } = getTableColumns(temples);

export const fetchTemples = cache(async () => {
  const res = await pool.query(
    "SELECT id,congregacion,municipio,coordenadas from temples where coordenadas is not null "
  );
  return res.rows;
});

export const fetchTempleId = cache(async (templeId: string) => {
  return (await db.select(columns).from(temples).where(eq(temples.id, templeId)))[0];
});

export const fetchTemplesByDistrict = async (distrito: string) => {
  return await db
    .select(columns)
    .from(temples)
    .where(eq(temples.distrito, Number(distrito)));
};

export const fetchTemplesByDistrictAdmin = async (distrito: string) => {
  return await db
    .select({
      id: temples.id,
      congregacion: temples.congregacion,
      distrito: temples.distrito,
      municipio: temples.municipio,
      password: temples.password,
    })
    .from(temples)
    .where(eq(temples.distrito, Number(distrito)));
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
  return (
    await db
      .select({ id: temples.id, password: temples.password })
      .from(temples)
      .where(eq(temples.id, templeId))
  )[0];
};

export const getAuthAdmin = async (distrito: string) => {
  return (
    await db
      .select({ distrito: users.distrito, password: users.password })
      .from(users)
      .where(eq(users.distrito, Number(distrito)))
  )[0];
};

export const addNewTemple = async (temple: any) => {
  await db.insert(temples).values({
    id: temple.id,
    congregacion: temple.congregacion,
    distrito: temple.distrito,
    municipio: temple.municipio,
    password: temple.password,
  });
};

export const updateTemple = async (newData: any, originalData: any) => {
  const updates = getUpdateDataDefer(newData, originalData);
  if (Object.keys(updates).length === 0) return;

  await db.update(temples).set(updates).where(eq(temples.id, originalData.id));
  if (updates.coordenadas) {
    revalidatePath("/(map)", "layout");
  }
};

export const changePassword = async (currentPassword: string, newPassword: string, session: any) => {
  const table = session.user.type === "admin" ? users : temples;
  const column = session.user.type === "admin" ? users.distrito : temples.id;
  const id = session.user.id;

  const { password } = (await db.select({ password: table.password }).from(table).where(eq(column, id)))[0];

  if (currentPassword !== password) return { ok: false };

  await db.update(table).set({ password: newPassword }).where(eq(column, id));

  return { ok: true };
};
