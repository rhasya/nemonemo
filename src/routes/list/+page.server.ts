import { db } from '$lib/server/db';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export async function load() {
	const q = query(collection(db, 'nemonemo'), orderBy('key', 'desc'));
	const querySnap = await getDocs(q);

	const list: Problem[] = [];

	querySnap.forEach((doc) => {
		const { key, title, sizeVer, sizeHor, difficulty } = doc.data();
		list.push({ id: doc.id, key, title, sizeVer, sizeHor, difficulty });
	});

	return { list };
}
