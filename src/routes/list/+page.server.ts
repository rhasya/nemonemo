import { getProblems } from '$lib/server/service/problem.js';

export async function load() {
	const problems = await getProblems();

	return { problems };
}
