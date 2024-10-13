import { hash } from 'node:crypto';

import { and, eq } from 'drizzle-orm';

import { usersTable } from '../../../schema';
import { getDb } from '../db';

export async function getUserWithCredential(username: string, password: string) {
	const hashedPassword = hash('sha256', password);

	const db = await getDb();
	const users = await db
		.select({ id: usersTable.id, username: usersTable.username })
		.from(usersTable)
		.where(
			and(
				eq(usersTable.username, username),
				eq(usersTable.password, hashedPassword),
				eq(usersTable.enabled, true)
			)
		);

	if (users.length === 1) {
		return { ...users[0] };
	} else {
		return null;
	}
}
