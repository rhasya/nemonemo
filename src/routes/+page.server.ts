import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	const user = locals.user;

	return { user };
}

export const actions = {
	logout: async function ({ locals, cookies }) {
		cookies.delete('token', { path: '/', httpOnly: true, secure: false });
		locals.user = undefined;

		redirect(303, '/login');
	}
};
