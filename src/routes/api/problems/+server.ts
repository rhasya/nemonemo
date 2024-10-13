import { createResult, getResult, updateResult } from '$lib/server/service/result.js';

export async function POST({ request }) {
	const { userId, problemId, board } = await request.json();

	const res = await getResult(userId, problemId);
	if (res) {
		await updateResult(res.id, board);
	} else {
		await createResult(userId, problemId, board);
	}

	return new Response(null, { status: 201 });
}
