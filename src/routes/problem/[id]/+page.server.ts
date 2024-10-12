import { error } from '@sveltejs/kit';

import { getProblem } from '$lib/server/service/problem.js';

export async function load({ params }) {
	const { id } = params;
	const nId = parseInt(id);
	if (isNaN(nId)) error(404);

	const problem = await getProblem(nId);

	if (!problem) {
		error(404);
	} else {
		return { problem };
	}
}
