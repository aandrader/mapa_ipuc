import { boolean, integer, jsonb, numeric, pgTable, varchar } from "drizzle-orm/pg-core";

export const temples = pgTable("temples", {
  id: varchar("id", { length: 255 }).notNull(),
  congregacion: varchar("congregacion", { length: 255 }).notNull(),
  imagen: boolean("imagen"),
  distrito: integer("distrito").notNull(),
  municipio: varchar("municipio", { length: 255 }).notNull(),
  coordenadas: numeric("coordenadas").$type<[number, number]>(),
  facebook: varchar("facebook", { length: 255 }),
  youtube: varchar("youtube", { length: 255 }),
  instagram: varchar("instagram", { length: 255 }),
  pagina: varchar("pagina", { length: 255 }),
  horarios: jsonb("horarios")
    .$type<{ dia: string; hora: string }[]>()
    .default([
      { dia: "Martes", hora: "18:30" },
      { dia: "Jueves", hora: "18:30" },
      { dia: "Sábado", hora: "18:30" },
      { dia: "Domingo", hora: "09:30" },
    ])
    .notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const users = pgTable("users", {
  distrito: integer("distrito").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});
