export async function load({ params }) {
	return {
		id: params.id,
		pHor: [...Array(20).keys()].map(() => [1, 2, 3]),
		pVer: [...Array(20).keys()].map(() => [3, 4, 5])
	};
}
