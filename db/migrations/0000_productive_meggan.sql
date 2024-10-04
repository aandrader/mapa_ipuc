-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "temples" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"congregacion" varchar(255),
	"distrito" integer,
	"municipio" varchar(255),
	"coordenadas" numeric[],
	"facebook" varchar(255),
	"youtube" varchar(255),
	"pagina" varchar(255),
	"horarios" jsonb DEFAULT '[{"dia":"Martes","hora":"18:30"},{"dia":"Jueves","hora":"18:30"},{"dia":"Sábado","hora":"18:30"},{"dia":"Domingo","hora":"09:30"}]'::jsonb,
	"password" varchar(255) NOT NULL,
	"instagram" varchar(255),
	"imagen" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"distrito" integer NOT NULL,
	"password" varchar(255) NOT NULL
);

*/