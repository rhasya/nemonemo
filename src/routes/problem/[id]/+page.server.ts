import { db } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';

export async function load({ params }) {
	const docRef = doc(db, 'nemonemo', params.id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const { title, sizeHor, sizeVer, pHor, pVer } = docSnap.data();

		return {
			id: params.id,
			title,
			sizeHor,
			sizeVer,
			pHor: JSON.parse(pHor),
			pVer: JSON.parse(pVer)
		};
	}

	error(404);
}
