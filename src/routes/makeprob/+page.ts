import { getAuthUser } from '$lib/util';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const user = await getAuthUser();
	if (!user) {
		redirect(303, '/login');
	}
}
