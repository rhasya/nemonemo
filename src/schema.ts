import { integer, pgTable, serial, text, varchar, boolean } from 'drizzle-orm/pg-core';

export const problemsTable = pgTable('problems', {
	id: serial().primaryKey(),
	code: varchar({ length: 200 }).notNull(),
	title: varchar({ length: 200 }).notNull(),
	width: integer().notNull(),
	height: integer().notNull(),
	value: text()
});

export const usersTable = pgTable('users', {
	id: serial().primaryKey(),
	username: varchar({ length: 200 }).notNull(),
	password: varchar({ length: 200 }).notNull(),
	enabled: boolean().default(false).notNull()
});
