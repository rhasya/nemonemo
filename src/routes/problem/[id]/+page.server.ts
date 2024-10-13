import { error } from '@sveltejs/kit';

import { getProblem } from '$lib/server/service/problem.js';
import { getResult } from '$lib/server/service/result';

export async function load({ params, locals }) {
	const { id } = params;
	const userId = locals.user?.id;

	const nId = parseInt(id);
	if (isNaN(nId)) error(404);

	const problem = await getProblem(nId);
	const result = await getResult(userId!, nId);
	const board = result ? JSON.parse(result.board) : null;

	if (!problem) {
		error(404);
	} else {
		return { userId, problem, board };
	}
}
