CREATE TABLE IF NOT EXISTS "problems" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"width" integer,
	"height" integer,
	"horizontal" varchar,
	"vertical" varchar
);
