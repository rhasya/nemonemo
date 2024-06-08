export const ssr = false;

import { doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/fb.js';
import { error } from '@sveltejs/kit';

function fillArr(arr: number[][]) {
	const maxLength = arr.reduce((prev: number, cur: number[]) => {
		return Math.max(prev, cur.length);
	}, 0);
	const fixed: (string | number)[][] = arr.map((item: number[]) => [
		...Array(maxLength - item.length).fill(''),
		...item
	]);

	return fixed;
}

export async function load({ params }) {
	const docRef = doc(db, 'nemonemo', params.id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const { title, sizeHor, sizeVer, pHor, pVer } = docSnap.data();

		// fix pHor
		const fixedPHor = fillArr(JSON.parse(pHor));
		const fixedPVer = fillArr(JSON.parse(pVer));

		return {
			id: params.id,
			title,
			sizeHor,
			sizeVer,
			pHor: fixedPHor,
			pVer: fixedPVer
		};
	}

	error(404);
}
