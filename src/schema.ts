import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const problemsTable = pgTable('problems', {
	id: serial().primaryKey(),
	code: varchar({ length: 200 }).notNull(),
	title: varchar({ length: 200 }).notNull(),
	width: integer().notNull(),
	height: integer().notNull(),
	value: text()
});
