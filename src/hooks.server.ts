import { verifyToken } from '$lib/server/auth';

export async function handle({ event, resolve }) {
	// Get cookie and save userinfo to locals
	const token = event.cookies.get('token');
	if (token) {
		const user = await verifyToken(token);
		if (user) {
			event.locals.user = user;
		} else {
			event.locals.user = undefined;
		}
	} else {
		event.locals.user = undefined;
	}

	return resolve(event);
}
