export const ssr = false;

import { db } from '$lib/fb';
import { getAuthUser } from '$lib/util';
import type { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';

export async function load() {
	const list: Problem[] = [];

	let queryNemonemo = null;

	const user = (await getAuthUser()) as User;
	let admin = false;
	if (user) {
		const queryUser = await getDoc(doc(db, 'users', user.uid));
		admin = queryUser.data()?.admin ?? false;
	}

	if (admin) {
		queryNemonemo = await getDocs(query(collection(db, 'nemonemo'), orderBy('key', 'desc')));
	} else {
		queryNemonemo = await getDocs(
			query(collection(db, 'nemonemo'), where('all', '==', true), orderBy('key', 'desc'))
		);
	}

	if (queryNemonemo) {
		queryNemonemo.forEach((item) => {
			const { key, title, sizeHor, sizeVer, difficulty } = item.data();
			list.push({ id: item.id, key, title, sizeHor, sizeVer, difficulty });
		});
	}

	return { list };
}
