import { and, eq } from 'drizzle-orm';
import { resultsTable } from '../../../schema';
import { getDb } from '../db';

export async function createResult(userId: number, problemId: number, board: string) {
	const db = await getDb();
	return await db.insert(resultsTable).values({
		userId,
		problemId,
		board
	});
}

export async function getResult(userId: number, problemId: number) {
	const db = await getDb();
	const res = await db
		.select({ id: resultsTable.id, board: resultsTable.board })
		.from(resultsTable)
		.where(and(eq(resultsTable.userId, userId), eq(resultsTable.problemId, problemId)));

	return res[0];
}

export async function updateResult(id: number, board: string) {
	const db = await getDb();
	return await db.update(resultsTable).set({ board: board }).where(eq(resultsTable.id, id));
}
