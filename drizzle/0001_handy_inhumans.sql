CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(200) NOT NULL,
	"password" varchar(200) NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL
);
