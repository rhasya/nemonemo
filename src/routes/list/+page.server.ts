import { db } from '$lib/server/db';
import { collection, getDocs } from 'firebase/firestore';

export async function load() {
	const querySnapshot = await getDocs(collection(db, 'nemonemo'));

	const list: Problem[] = [];

	querySnapshot.forEach((doc) => {
		const { title, sizeVer, sizeHor } = doc.data();
		list.push({ id: doc.id, title, sizeVer, sizeHor });
	});

	return { list };
}
