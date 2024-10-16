import { eq } from 'drizzle-orm';
import type { z } from 'zod';

import type { createProblemDto } from '$lib/server/dto/problemDto';
import { problemsTable } from '../../../schema';
import { getDb } from '../db';

export async function createProblem(input: z.infer<typeof createProblemDto>) {
	const db = await getDb();
	await db.insert(problemsTable).values(input);
}

export async function getProblems() {
	const db = await getDb();
	return await db.select().from(problemsTable);
}

export async function getProblem(id: number) {
	const db = await getDb();
	const result = await db.select().from(problemsTable).where(eq(problemsTable.id, id));

	return result[0];
}
