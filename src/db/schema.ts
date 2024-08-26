import { boolean, integer, jsonb, numeric, pgTable, varchar } from "drizzle-orm/pg-core";

export const temples = pgTable("temples", {
  id: varchar("id", { length: 255 }).notNull(),
  congregacion: varchar("congregacion", { length: 255 }),
  imagen: boolean("imagen"),
  distrito: integer("distrito"),
  municipio: varchar("municipio", { length: 255 }),
  coordenadas: numeric("coordenadas").array(),
  facebook: varchar("facebook", { length: 255 }),
  youtube: varchar("youtube", { length: 255 }),
  instagram: varchar("instagram", { length: 255 }),
  pagina: varchar("pagina", { length: 255 }),
  horarios: jsonb("horarios").$type<{ dia: string; hora: string }[]>(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const users = pgTable("users", {
  distrito: integer("distrito").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});
