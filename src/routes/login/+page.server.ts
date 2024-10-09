import { redirect } from '@sveltejs/kit';
import { createToken } from '$lib/server/auth';

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

		// TODO: Get user info from database
		if (username !== 'admin' && password !== 'admin') {
			return { error: 'wrong username and password!', username, password };
		}

		// TODO: Save token at cookie
		const token = await createToken({ username: 'admin' });
		cookies.set('token', token, { path: '/', httpOnly: true });

		redirect(307, '/');
	}
};
