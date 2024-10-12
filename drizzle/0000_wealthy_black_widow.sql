CREATE TABLE IF NOT EXISTS "problems" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(200) NOT NULL,
	"title" varchar(200) NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"value" text
);
