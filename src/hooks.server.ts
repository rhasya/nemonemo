import { verifyToken } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	// Get cookie and save userinfo to locals
	const token = event.cookies.get('token');
	if (token) {
		const user = await verifyToken(token);
		if (user) {
			event.locals.user = user;
		} else {
			event.cookies.delete('token', { path: '/' });
			event.locals.user = undefined;
		}
	} else {
		event.cookies.delete('token', { path: '/' });
		event.locals.user = undefined;
	}

	if (['/', '/login'].indexOf(event.url.pathname) == -1) {
		if (!event.locals.user) {
			redirect(303, '/login');
		}
	}

	return resolve(event);
}
