import { browser } from '$app/environment';
import { auth } from './fb';

export async function getAuthUser() {
	if (browser) {
		return new Promise((res) => {
			auth.onAuthStateChanged((currentUser) => {
				res(currentUser);
			});
		});
	}
	return null;
}
