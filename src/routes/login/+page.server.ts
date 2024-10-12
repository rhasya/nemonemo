import { redirect } from '@sveltejs/kit';

import { createToken } from '$lib/server/auth';
import { getUserWithCredential } from '$lib/server/service/user.js';

export function load({ locals }) {
	if (locals.user) {
		redirect(303, '/');
	}
}

export const actions = {
	default: async function ({ request, cookies }) {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		// Get user info from database
		const user = await getUserWithCredential(username, password);
		if (!user) {
			return { error: 'wrong username and password!', username, password };
		}

		// TODO: Save token at cookie
		const token = await createToken({ id: user.id, username: user.username });
		cookies.set('token', token, { path: '/', httpOnly: true, secure: false });

		redirect(307, '/');
	}
};
