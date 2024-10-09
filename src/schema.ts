import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const problem = pgTable('problems', {
	id: serial().primaryKey(),
	title: varchar({ length: 200 }).notNull(),
	width: integer(),
	height: integer(),
	horizontal: varchar(),
	vertical: varchar()
});
